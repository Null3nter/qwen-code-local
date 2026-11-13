/**
 * @license
 * Copyright 2026 Qwen Team / Null3nter fork
 * SPDX-License-Identifier: Apache-2.0
 *
 * Built-in GitHub MCP (no npx): vendor/github-mcp/github-stdio-server.mjs
 * via process.execPath (desktop-bundled Node or system Node).
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MCPServerConfig } from '../config/mcp-server-config.js';

export const GITHUB_DIRECT_MCP_SERVER_NAME = 'github-direct';

function resolveBridgePath(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(here, '../../../vendor/github-mcp/github-stdio-server.mjs'),
    path.resolve(here, '../../vendor/github-mcp/github-stdio-server.mjs'),
    path.resolve(here, '../vendor/github-mcp/github-stdio-server.mjs'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

export function resolveGithubDirectBridgePath(): string {
  return resolveBridgePath();
}

function readTokenFile(): string | undefined {
  try {
    const p = path.join(os.homedir(), '.qwen', 'github-token');
    if (!fs.existsSync(p)) return undefined;
    const t = fs.readFileSync(p, 'utf8').trim();
    return t || undefined;
  } catch {
    return undefined;
  }
}

export function readGithubTokenFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): string | undefined {
  return (
    env['GITHUB_TOKEN']?.trim() ||
    env['GITHUB_PERSONAL_ACCESS_TOKEN']?.trim() ||
    env['GH_TOKEN']?.trim() ||
    readTokenFile() ||
    undefined
  );
}

export function createGithubDirectMcpConfig(
  token?: string,
): MCPServerConfig | undefined {
  const resolved = token?.trim() || readGithubTokenFromEnv();
  if (!resolved) return undefined;
  const bridge = resolveBridgePath();
  if (!fs.existsSync(bridge)) return undefined;

  return new MCPServerConfig(
    process.execPath,
    [bridge],
    {
      GITHUB_TOKEN: resolved,
      GITHUB_PERSONAL_ACCESS_TOKEN: resolved,
    },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    120_000,
    true,
    'Built-in GitHub API tools (no npx). Token from env or ~/.qwen/github-token.',
  );
}

export function injectGithubDirectMcpServer(
  servers: Record<string, MCPServerConfig>,
): Record<string, MCPServerConfig> {
  if (servers[GITHUB_DIRECT_MCP_SERVER_NAME] || servers['github']) {
    return servers;
  }
  const cfg = createGithubDirectMcpConfig();
  if (!cfg) return servers;
  return { ...servers, [GITHUB_DIRECT_MCP_SERVER_NAME]: cfg };
}
