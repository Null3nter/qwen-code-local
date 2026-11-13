/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { MCPServerConfig } from '@qwen-code/qwen-code-core';
import { injectGithubDirectMcpServer } from '@qwen-code/qwen-code-core/githubDirectMcp';
import { loadProjectMcpServers } from './mcpJson.js';
import { writeStderrLine } from '../utils/stdioHelpers.js';

/**
 * Assemble the effective MCP server map from every source in precedence order,
 * lowest → highest (later wins on a name collision):
 *
 *   1. user / default settings    (`scope` unset)
 *   2. project `.mcp.json`         (`scope: 'project'`)
 *   3. workspace / system settings (`scope: 'workspace' | 'system'`)
 *   4. `--mcp-config` CLI servers  (`scope` unset)
 *   5. built-in github-direct when a GitHub token is available
 */
export function assembleMcpServers(
  mergedSettingsServers: Record<string, MCPServerConfig> | undefined,
  cwd: string,
  cliMcpServers?: Record<string, MCPServerConfig> | null,
): Record<string, MCPServerConfig> {
  const belowProject: Record<string, MCPServerConfig> = {};
  const aboveProject: Record<string, MCPServerConfig> = {};
  for (const [name, config] of Object.entries(mergedSettingsServers ?? {})) {
    if (config.scope === 'workspace' || config.scope === 'system') {
      aboveProject[name] = config;
    } else {
      belowProject[name] = config;
    }
  }

  const projectResult = loadProjectMcpServers(cwd);
  for (const error of projectResult.errors) {
    writeStderrLine(`Warning: ${error}`);
  }

  const assembled = {
    ...belowProject,
    ...projectResult.servers,
    ...aboveProject,
    ...(cliMcpServers ?? {}),
  };

  return injectGithubDirectMcpServer(assembled);
}
