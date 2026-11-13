#!/usr/bin/env node
/**
 * Built-in GitHub MCP server for Qwen Code (stdio JSON-RPC).
 * Uses the app's Node — does NOT use npx.
 * Auth: GITHUB_TOKEN | GITHUB_PERSONAL_ACCESS_TOKEN
 */
import { createInterface } from 'node:readline';

const TOKEN = process.env.GITHUB_TOKEN || process.env.GITHUB_PERSONAL_ACCESS_TOKEN || '';
const API = (process.env.GITHUB_API_URL || 'https://api.github.com').replace(/\/$/, '');

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

async function gh(path, { method = 'GET', body } = {}) {
  if (!TOKEN) {
    throw new Error('Missing GITHUB_TOKEN or GITHUB_PERSONAL_ACCESS_TOKEN.');
  }
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${TOKEN}`,
      'User-Agent': 'qwen-code-github-direct',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = data && typeof data === 'object' && data.message ? data.message : `GitHub API ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

const TOOLS = [
  { name: 'github_get_me', description: 'Get the authenticated GitHub user', inputSchema: { type: 'object', properties: {}, additionalProperties: false } },
  { name: 'github_list_repos', description: 'List repositories for the authenticated user', inputSchema: { type: 'object', properties: { per_page: { type: 'number' }, sort: { type: 'string' } }, additionalProperties: false } },
  { name: 'github_get_repo', description: 'Get a repository by owner/name', inputSchema: { type: 'object', properties: { owner: { type: 'string' }, repo: { type: 'string' } }, required: ['owner', 'repo'], additionalProperties: false } },
  { name: 'github_get_file', description: 'Get file contents from a repository', inputSchema: { type: 'object', properties: { owner: { type: 'string' }, repo: { type: 'string' }, path: { type: 'string' }, ref: { type: 'string' } }, required: ['owner', 'repo', 'path'], additionalProperties: false } },
  { name: 'github_list_issues', description: 'List issues for a repository', inputSchema: { type: 'object', properties: { owner: { type: 'string' }, repo: { type: 'string' }, state: { type: 'string' }, per_page: { type: 'number' } }, required: ['owner', 'repo'], additionalProperties: false } },
  { name: 'github_create_issue', description: 'Create an issue on a repository', inputSchema: { type: 'object', properties: { owner: { type: 'string' }, repo: { type: 'string' }, title: { type: 'string' }, body: { type: 'string' } }, required: ['owner', 'repo', 'title'], additionalProperties: false } },
  { name: 'github_list_pulls', description: 'List pull requests for a repository', inputSchema: { type: 'object', properties: { owner: { type: 'string' }, repo: { type: 'string' }, state: { type: 'string' }, per_page: { type: 'number' } }, required: ['owner', 'repo'], additionalProperties: false } },
  { name: 'github_search_code', description: 'Search code on GitHub', inputSchema: { type: 'object', properties: { q: { type: 'string' }, per_page: { type: 'number' } }, required: ['q'], additionalProperties: false } },
];

async function callTool(name, args = {}) {
  switch (name) {
    case 'github_get_me': return gh('/user');
    case 'github_list_repos': return gh(`/user/repos?per_page=${args.per_page || 30}&sort=${encodeURIComponent(args.sort || 'updated')}`);
    case 'github_get_repo': return gh(`/repos/${args.owner}/${args.repo}`);
    case 'github_get_file': {
      const ref = args.ref ? `?ref=${encodeURIComponent(args.ref)}` : '';
      const data = await gh(`/repos/${args.owner}/${args.repo}/contents/${String(args.path).replace(/^\/+/, '')}${ref}`);
      if (data && data.encoding === 'base64' && typeof data.content === 'string') {
        return { path: data.path, sha: data.sha, size: data.size, html_url: data.html_url, content: Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8') };
      }
      return data;
    }
    case 'github_list_issues': return gh(`/repos/${args.owner}/${args.repo}/issues?state=${args.state || 'open'}&per_page=${args.per_page || 30}`);
    case 'github_create_issue': return gh(`/repos/${args.owner}/${args.repo}/issues`, { method: 'POST', body: { title: args.title, body: args.body || '' } });
    case 'github_list_pulls': return gh(`/repos/${args.owner}/${args.repo}/pulls?state=${args.state || 'open'}&per_page=${args.per_page || 30}`);
    case 'github_search_code': return gh(`/search/code?q=${encodeURIComponent(args.q)}&per_page=${args.per_page || 20}`);
    default: throw new Error(`Unknown tool: ${name}`);
  }
}

async function handle(msg) {
  const { id, method, params } = msg;
  try {
    if (method === 'initialize') {
      send({ jsonrpc: '2.0', id, result: { protocolVersion: params?.protocolVersion || '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'qwen-github-direct', version: '1.0.0' } } });
      return;
    }
    if (method === 'notifications/initialized' || method === 'initialized') return;
    if (method === 'tools/list') { send({ jsonrpc: '2.0', id, result: { tools: TOOLS } }); return; }
    if (method === 'tools/call') {
      const result = await callTool(params?.name, params?.arguments || {});
      send({ jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) }] } });
      return;
    }
    if (method === 'ping') { send({ jsonrpc: '2.0', id, result: {} }); return; }
    send({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } });
  } catch (err) {
    if (id === undefined || id === null) return;
    send({ jsonrpc: '2.0', id, error: { code: -32000, message: err instanceof Error ? err.message : String(err) } });
  }
}

createInterface({ input: process.stdin, crlfDelay: Infinity }).on('line', (line) => {
  const t = line.trim();
  if (!t) return;
  try { void handle(JSON.parse(t)); } catch { /* ignore */ }
});
