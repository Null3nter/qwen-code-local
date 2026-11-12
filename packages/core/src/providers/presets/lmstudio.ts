/**
 * @license
 * Copyright 2026 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthType } from '../../core/contentGenerator.js';
import type { ProviderConfig } from '../types.js';

/**
 * LM Studio local OpenAI-compatible server.
 * Default server URL is http://localhost:1234/v1 (LM Studio Developer tab).
 * API key is optional for local servers; any non-empty placeholder works.
 */
export const lmstudioProvider: ProviderConfig = {
  id: 'lmstudio',
  label: 'LM Studio (Local)',
  description:
    'Connect to models running in LM Studio (OpenAI-compatible local server)',
  protocol: AuthType.USE_OPENAI,
  baseUrl: 'http://localhost:1234/v1',
  // LM Studio does not require a real API key; a placeholder is enough.
  envKey: 'LMSTUDIO_API_KEY',
  models: [
    {
      // Placeholder id — user replaces with the model id shown in LM Studio
      // (e.g. qwen3-coder-30b, qwen2.5-coder-14b-instruct, etc.).
      id: 'local-model',
      name: 'Local model (edit id to match LM Studio)',
      contextWindowSize: 131072,
    },
  ],
  modelsEditable: true,
  modelNamePrefix: 'LM Studio',
  apiKeyPlaceholder: 'lm-studio (optional for local)',
  documentationUrl: 'https://lmstudio.ai/docs/app/api',
  uiGroup: 'local',
  uiLabels: {
    flowTitle: 'LM Studio',
    baseUrlStepTitle: 'LM Studio server URL',
  },
};
