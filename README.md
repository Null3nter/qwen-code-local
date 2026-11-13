<div align="center">

# Qwen Code Local

[![License](https://img.shields.io/github/license/Null3nter/qwen-code-local.svg)](./LICENSE)
[![Release](https://img.shields.io/github/v/release/Null3nter/qwen-code-local?include_prereleases)](https://github.com/Null3nter/qwen-code-local/releases)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)

**A self-contained, local-first AI coding agent. Zero `npx` overhead, native self-hosted model support, and direct MCP connectivity.**

[Explore Releases](https://github.com/Null3nter/qwen-code-local/releases) · [Report an Issue](https://github.com/Null3nter/qwen-code-local/issues)

</div>

---

## Architecture & Core Changes

`qwen-code-local` is a purpose-built fork designed to eliminate external package-runner bloat and runtime cloud dependencies:

* **Zero `npx` Dependencies** — Runs completely standalone. No dynamic package-manager fetches or background cache lookups.
* **Direct MCP Connections** — Bypasses fragile `npx`-spawned tool wrappers by connecting directly to local binaries and SSE endpoints.
* **Self-Hosted Model First** — Native configuration pathways for local backends (Ollama, vLLM, llama.cpp, LM Studio) or standard cloud endpoints.

---

## Desktop Downloads (`v0.1.0-rc.2`)

Pre-built standalone desktop binaries are available directly from the [Releases page](https://github.com/Null3nter/qwen-code-local/releases)[span_0](start_span)[span_0](end_span)[span_1](start_span)[span_1](end_span):

| Platform | Package | Size |
| :--- | :--- | :--- |
| **Windows (x64)** | [`Qwen-Code-Desktop_0.1.0-rc.2_x64-setup.exe`](https://github.com/Null3nter/qwen-code-local/releases/tag/desktop-v0.1.0-rc.2)[span_2](start_span)[span_2](end_span)[span_3](start_span)[span_3](end_span) | 53.7 MB[span_4](start_span)[span_4](end_span) |
| **macOS (Apple Silicon)** | [`Qwen-Code-Desktop_0.1.0-rc.2_aarch64.dmg`](https://github.com/Null3nter/qwen-code-local/releases/tag/desktop-v0.1.0-rc.2)[span_5](start_span)[span_5](end_span)[span_6](start_span)[span_6](end_span) | 94.3 MB[span_7](start_span)[span_7](end_span) |
| **macOS (Tarball)** | [`Qwen-Code-Desktop.app.tar.gz`](https://github.com/Null3nter/qwen-code-local/releases/tag/desktop-v0.1.0-rc.2)[span_8](start_span)[span_8](end_span)[span_9](start_span)[span_9](end_span) | 96.3 MB[span_10](start_span)[span_10](end_span) |
| **Linux (Debian / Ubuntu)** | [`Qwen-Code-Desktop_0.1.0-rc.2_amd64.deb`](https://github.com/Null3nter/qwen-code-local/releases/tag/desktop-v0.1.0-rc.2)[span_11](start_span)[span_11](end_span)[span_12](start_span)[span_12](end_span) | 104.9 MB[span_13](start_span)[span_13](end_span) |
| **Linux (AppImage)** | [`Qwen-Code-Desktop_0.1.0-rc.2_amd64.AppImage`](https://github.com/Null3nter/qwen-code-local/releases/tag/desktop-v0.1.0-rc.2)[span_14](start_span)[span_14](end_span)[span_15](start_span)[span_15](end_span) | 163.4 MB[span_16](start_span)[span_16](end_span) |

---

## Standalone Installation

Install the CLI tool directly via standalone scripts:

**Linux / macOS:**
```bash
curl -fsSL [https://raw.githubusercontent.com/Null3nter/qwen-code-local/main/scripts/install.sh](https://raw.githubusercontent.com/Null3nter/qwen-code-local/main/scripts/install.sh) | bash
