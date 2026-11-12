# Local model providers (LM Studio & Ollama)

Qwen Code can drive models hosted on your machine through OpenAI-compatible local servers. Two first-class options appear in `/auth` under the local provider group:

| Provider | Default base URL | Env key (placeholder OK) |
| -------- | ---------------- | ------------------------ |
| **LM Studio** | `http://localhost:1234/v1` | `LMSTUDIO_API_KEY` |
| **Ollama** | `http://localhost:11434/v1` | `OLLAMA_API_KEY` |

Neither server requires a real API key. Use any non-empty value (for example `lm-studio` or `ollama`).

## LM Studio

1. Install [LM Studio](https://lmstudio.ai/) and download a coding model (e.g. Qwen3-Coder).
2. Load the model, open the **Developer** tab, and start the local server (default port **1234**).
3. Enable **tool calling** / function calling in the server options if available.
4. In Qwen Code run `/auth`, choose **LM Studio (Local)** (or Custom Provider pointing at the same URL).
5. Confirm the base URL (`http://localhost:1234/v1`), set a placeholder API key if prompted, and set the **model id** to the exact id LM Studio shows for the loaded model (replace the `local-model` placeholder).
6. Optionally raise context length in LM Studio to match `contextWindowSize` in settings.

Equivalent `~/.qwen/settings.json` fragment:

```json
{
  "modelProviders": {
    "openai": [
      {
        "id": "your-lmstudio-model-id",
        "name": "LM Studio model",
        "baseUrl": "http://localhost:1234/v1",
        "envKey": "LMSTUDIO_API_KEY",
        "generationConfig": {
          "contextWindowSize": 131072
        }
      }
    ]
  },
  "env": {
    "LMSTUDIO_API_KEY": "lm-studio"
  },
  "security": {
    "auth": {
      "selectedType": "openai"
    }
  },
  "model": {
    "name": "your-lmstudio-model-id"
  }
}
```

## Ollama

1. Install [Ollama](https://ollama.com/) and pull a model, e.g. `ollama pull qwen3-coder`.
2. Ensure the API is reachable at `http://localhost:11434/v1`.
3. In Qwen Code: `/auth` → **Ollama (Local)**.
4. Set the model id to match `ollama list` (e.g. `qwen3-coder:latest`).

## GitHub access for the agent

The coding agent can use GitHub when a GitHub MCP server (or the built-in Git tools) is available:

1. **Git CLI** — install `git` and authenticate (`gh auth login` or SSH keys). Shell tools then run `git` / `gh` on your behalf.
2. **GitHub MCP** — configure an MCP server that exposes GitHub APIs (issues, PRs, contents). Add it under your MCP settings (user or project `.qwen` / MCP config) with a PAT that has the scopes you need (`repo`, `read:org`, etc.).
3. **Connected GitHub in this chat** — when using Grok with the GitHub connector, repository read/write goes through the authenticated GitHub account (here: Null3nter).

For CI/headless runs, prefer a machine user PAT in env vars consumed by the MCP server or by scripts the agent invokes—never commit tokens.

## Troubleshooting

- **Connection refused** — start the LM Studio / Ollama server and confirm the port.
- **Model not found** — model `id` in settings must match the id the local server advertises (`GET /v1/models`).
- **Tool calls fail** — enable tool/function calling on the local server; some quantized models need a chat template that supports tools.
- **Large context OOM** — lower `contextWindowSize` or use a smaller quant.
