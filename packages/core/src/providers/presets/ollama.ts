/**
 * @license
 * Copyright 2026 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthType } from '../../core/contentGenerator.js';
import type { ProviderConfig } from '../types.js';

/**
 * Ollama local OpenAI-compatible server.
 * Default server URL is http://localhost:11434/v1.
 * API key is optional; any non-empty placeholder works.
 */
export const ollamaProvider: ProviderConfig = {
  id: 'ollama',
  label: 'Ollama (Local)',
  description:
    'Connect to models running in Ollama (OpenAI-compatible local server)',
  protocol: AuthType.USE_OPENAI,
  baseUrl: 'http://localhost:11434/v1',
  envKey: 'OLLAMA_API_KEY',
  models: [
    {
      id: 'qwen3-coder:latest',
      name: 'Qwen3 Coder (edit to match ollama list)',
      contextWindowSize: 32768,
    },
  ],
  modelsEditable: true,
  modelNamePrefix: 'Ollama',
  apiKeyPlaceholder: 'ollama (optional for local)',
  documentationUrl: 'https://github.com/ollama/ollama/blob/main/docs/openai.md',
  uiGroup: 'local',
  uiLabels: {
    flowTitle: 'Ollama',
    baseUrlStepTitle: 'Ollama server URL',
  },
};
