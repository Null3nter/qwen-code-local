#!/usr/bin/env node
/**
 * GitHub device-flow login (no CLIENT_SECRET, no npx).
 * Set GITHUB_CLIENT_ID to an OAuth App with Device Flow enabled.
 * Saves token to ~/.qwen/github-token
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const SCOPE = process.env.GITHUB_OAUTH_SCOPE || 'repo read:user';
if (!CLIENT_ID) {
  console.error('Set GITHUB_CLIENT_ID (OAuth App with Device Flow enabled).');
  process.exit(1);
}

async function formPost(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

const started = await formPost('https://github.com/login/device/code', {
  client_id: CLIENT_ID,
  scope: SCOPE,
});
if (started.error) {
  console.error(started.error_description || started.error);
  process.exit(1);
}

console.log(`\nOpen: ${started.verification_uri}`);
console.log(`Code: ${started.user_code}\nWaiting...\n`);

const intervalMs = (started.interval || 5) * 1000;
const deadline = Date.now() + (started.expires_in || 900) * 1000;
while (Date.now() < deadline) {
  await new Promise((r) => setTimeout(r, intervalMs));
  const token = await formPost('https://github.com/login/oauth/access_token', {
    client_id: CLIENT_ID,
    device_code: started.device_code,
    grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
  });
  if (token.error === 'authorization_pending' || token.error === 'slow_down') continue;
  if (token.error) {
    console.error(token.error_description || token.error);
    process.exit(1);
  }
  if (!token.access_token) {
    console.error('No access_token');
    process.exit(1);
  }
  const dir = path.join(os.homedir(), '.qwen');
  fs.mkdirSync(dir, { recursive: true });
  const tokenPath = path.join(dir, 'github-token');
  fs.writeFileSync(tokenPath, token.access_token, { mode: 0o600 });
  try { fs.chmodSync(tokenPath, 0o600); } catch { /* win */ }
  console.log('Saved token to', tokenPath);
  process.exit(0);
}
console.error('Timed out');
process.exit(1);
