<div align="center">
Qwen Code Local
A self-contained, local-first AI coding agent for your terminal, desktop, editor, and browser — standalone installation, native local model hosting, and direct ⁠npx⁠-free MCP connections.
Releases · Desktop App (⁠v0.1.0-rc.2⁠) · Report an Issue
</div>
Why ⁠qwen-code-local⁠?
This fork re-architects Qwen Code into a standalone, local-first engineering environment without package-runner overhead or forced cloud dependencies:
￼ Zero-Dependency Standalone Installer & Desktop App — Install the CLI directly via a standalone script or download pre-built native desktop binaries. No global ⁠npm⁠ trees or ⁠npx⁠ runtime downloads required.
￼ First-Class Self-Hosted Local Models — Register and switch between your own locally hosted models (Ollama, llama.cpp, vLLM, LM Studio, or any OpenAI-compatible local endpoint) directly in your configuration.
￼ Direct MCP Connections (No ⁠npx⁠) — Replaces standard ⁠npx⁠-spawned Model Context Protocol (MCP) bridges with direct, native connections (local binaries, HTTP/SSE) for instant startup, lower memory footprint, and deterministic offline reliability.
￼ Full Agentic Power — Includes Auto-Memory, Auto-Skills, SubAgents, Agent Teams, Plan Mode, Git Worktrees, and multi-protocol runtime switching.
Installation
1. Desktop App (⁠v0.1.0-rc.2⁠)
Download the standalone desktop installer for your operating system directly from GitHub Releases:
Platform
Installer / Binary
Size
macOS (Apple Silicon / Universal)
Qwen-Code-Desktop_0.1.0-rc.2_aarch64.dmg
~94.3 MB
macOS (App Archive)
Qwen-Code-Desktop.app.tar.gz
~96.3 MB
Linux (Debian / Ubuntu)
Qwen-Code-Desktop_0.1.0-rc.2_amd64.deb
~104.9 MB
Linux (AppImage)
Qwen-Code-Desktop_0.1.0-rc.2_amd64.AppImage
~163.4 MB
Windows (x64 Installer)
Qwen-Code-Desktop_0.1.0-rc.2_x64-setup.exe
~53.7 MB

2. Standalone CLI Script
Install the terminal CLI directly without ⁠npm⁠ or ⁠npx⁠:
Linux / macOS:
Windows (PowerShell):
Quick Start & Self-Hosted Local Models
Point ⁠qwen-code-local⁠ directly to your self-hosted inference server (Ollama, llama.cpp, vLLM, or LM Studio) in ⁠~/.qwen/settings.json⁠ to run completely offline:
Direct MCP Configuration (Zero ⁠npx⁠)
Instead of spawning ⁠npx⁠ child processes for every tool server, ⁠qwen-code-local⁠ connects directly to compiled local binaries or active MCP endpoints in ⁠~/.qwen/settings.json⁠:
This eliminates ⁠npx⁠ cache lookups, network cold-starts, and external package overhead when working offline or in air-gapped environments.
Interfaces & Usage Modes
Interface
How to Launch
Desktop App
Open Qwen Code Desktop from your Applications / Start Menu.
Terminal UI
Run qwen inside any project directory. Use @filename to reference files in context.
Web Shell & Daemon
Run qwen serve --open (http://127.0.0.1:4170) or qwen daemon start for shared background sessions.
Headless / Automation
Run qwen -p "Summarize recent git changes" in CI/CD pipelines or shell scripts.
IDE Integrations
Connect via ACP to VS Code, Zed, or JetBrains editors.

Building from Source
To build the CLI or desktop bundle locally from source:
Acknowledgments & Upstream
This project is an active, independent fork of QwenLM/qwen-code (originally derived from Google Gemini CLI), refactored by @Null3nter for standalone distribution, self-hosted local model workflows, and direct ⁠npx⁠-free MCP connectivity.
License
Licensed under the terms in LICENSE.