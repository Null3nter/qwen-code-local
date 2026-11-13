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



<div align="center">
Qwen Code Local
A self-contained, local-first AI coding agent. Zero ⁠npx⁠ overhead, native self-hosted model support, and direct MCP connectivity across terminal, desktop, and IDE workflows.
Explore Releases · Desktop App (⁠v0.1.0-rc.2⁠) · Report an Issue
</div>
Architecture & Core Changes
⁠qwen-code-local⁠ is a purpose-built fork designed to eliminate external package-runner bloat, supply-chain surprises, and forced cloud dependencies:
￼ Zero ⁠npx⁠ Dependencies — Runs completely standalone. Eliminates dynamic package-manager fetches, hidden sub-process spawns, and background cache lookups when executing tools.
￼ Direct MCP Connections — Bypasses fragile ⁠npx⁠-spawned tool wrappers by connecting directly to compiled local binaries, Unix sockets, or local HTTP/SSE endpoints for instant cold-start times and deterministic offline execution.
￼ Self-Hosted Model First — Native configuration pathways for local inference engines (Ollama, llama.cpp, vLLM, LM Studio) alongside seamless runtime fallback to external APIs (OpenAI, Anthropic, Gemini, Qwen).
￼ Full Agentic Harness — Retains complete support for Auto-Memory, Auto-Skills, SubAgents, Agent Teams, Plan Mode, Sandbox isolation, and Git Worktrees.
Desktop Downloads (⁠v0.1.0-rc.2⁠)
Pre-built standalone desktop binaries are available directly from the Releases page:
Platform
Package
Size
Windows (x64)
Qwen-Code-Desktop_0.1.0-rc.2_x64-setup.exe
53.7 MB
macOS (Apple Silicon)
Qwen-Code-Desktop_0.1.0-rc.2_aarch64.dmg
94.3 MB
macOS (Tarball)
Qwen-Code-Desktop.app.tar.gz
96.3 MB
Linux (Debian / Ubuntu)
Qwen-Code-Desktop_0.1.0-rc.2_amd64.deb
104.9 MB
Linux (AppImage)
Qwen-Code-Desktop_0.1.0-rc.2_amd64.AppImage
163.4 MB

Standalone CLI Installation
Install the terminal agent directly via standalone bootstrap scripts without needing global ⁠npm⁠ or ⁠npx⁠:
Linux / macOS:
Windows (PowerShell):
Configuration
All runtime settings, model endpoints, and tool servers are managed in ⁠~/.qwen/settings.json⁠.
1. Connecting Self-Hosted Local Models
Point ⁠qwen-code-local⁠ directly to any local OpenAI-compatible inference server. You can define a primary local model and switch between profiles on the fly using ⁠/model⁠ inside an active session:
2. Direct MCP Integration (Zero ⁠npx⁠)
Instead of invoking ⁠npx -y @modelcontextprotocol/...⁠ on every startup, configure direct execution paths to compiled binaries or active local SSE/HTTP servers:
Workflow & Interfaces
⁠qwen-code-local⁠ adapts to how you work across terminals, GUIs, and automated pipelines:
Mode
Command / Entry
Description
Interactive CLI
qwen
Full terminal UI with @file context injection, /plan, /review, and /model switching.
Desktop App
Native Binary
Standalone graphical workspace with integrated terminal, diff viewer, and session history.
Daemon & Web UI
qwen serve --open
Launches a shared background service (http://127.0.0.1:4170) with an HTTP + SSE API and Web Shell.
Headless / CI
qwen -p "..."
Non-interactive execution for shell scripts, git hooks, and automated code reviews.
IDE Integration
ACP Protocol
Connects directly to VS Code, Zed, and JetBrains IDEs using the local daemon or CLI binary.

Background Daemon Management
Run a persistent local agent service so multiple editor windows and scripts can share state without cold-starting new processes:
(Note: On multi-user machines, set ⁠QWEN_SERVER_TOKEN⁠ and start with ⁠--require-auth⁠ to enforce bearer token authentication on the local API.)
Agentic Capabilities
￼ SubAgents & Agent Teams — Delegate parallel research, test generation, and refactoring tasks across isolated sub-agents.
￼ Auto-Memory & Context — Automatically indexes project structure, conventions, and session decisions across runs without manual prompting.
￼ Built-in Slash Commands — Use ⁠/review⁠, ⁠/bugfix⁠, ⁠/batch⁠, ⁠/loop⁠, and ⁠/plan⁠ out of the box.
￼ Git Worktree Isolation — Test experimental edits or multi-file refactors in isolated worktrees before merging back to your working branch.
Building from Source
To compile the CLI or package the desktop application locally:
License & Acknowledgments
Forked from QwenLM/qwen-code (originally derived from Google Gemini CLI) and re-engineered for standalone distribution, self-hosted models, and direct ⁠npx⁠-free MCP connectivity by @Null3nter.
Licensed under the LICENSE file.