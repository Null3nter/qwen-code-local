<div align="center">

# Qwen Code Local

[![License](https://img.shields.io/github/license/Null3nter/qwen-code-local.svg)](./LICENSE)
[![Release](https://img.shields.io/github/v/release/Null3nter/qwen-code-local?include_prereleases)](https://github.com/Null3nter/qwen-code-local/releases)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)

**A self-contained, local-first AI coding agent. Zero `npx` overhead, native self-hosted model support, and direct MCP connectivity.**

[Releases](https://github.com/Null3nter/qwen-code-local/releases) ·
[Issues](https://github.com/Null3nter/qwen-code-local/issues) ·
[Pull requests](https://github.com/Null3nter/qwen-code-local/pulls) ·
[Discussions](https://github.com/Null3nter/qwen-code-local/discussions)

</div>

---

## Unofficial fork — not the official Qwen project

**This repository is an independent community fork.** It is **not** affiliated with, endorsed by, or maintained by the official Qwen / Alibaba QwenLM team.

| | Official project | This fork |
|---|---|---|
| Repository | [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | **[Null3nter/qwen-code-local](https://github.com/Null3nter/qwen-code-local)** |
| Issues & support | Upstream issues | **[Issues here](https://github.com/Null3nter/qwen-code-local/issues)** |
| Pull requests | Upstream PRs | **[PRs here](https://github.com/Null3nter/qwen-code-local/pulls)** |
| Releases / installers | Upstream releases | **[Releases here](https://github.com/Null3nter/qwen-code-local/releases)** |
| Security reports | Upstream security policy | **[Security](./SECURITY.md)** → report on **this** repo |

Please **do not** open issues or PRs for this fork against the upstream `QwenLM/qwen-code` repository. Use the links in the table above.

Upstream source remains available under its original license; this fork adds local-first changes (LM Studio / Ollama auth, desktop builds, GitHub-without-npx MCP, and related tooling).

---

## Architecture & core changes

`qwen-code-local` is a purpose-built fork aimed at fewer external package-runner dependencies and stronger local/self-hosted workflows:

* **Zero `npx` for core + GitHub MCP** — Prefer bundled Node and built-in bridges over dynamic package fetches.
* **Direct MCP connections** — Connect to local binaries / SSE / HTTP MCP endpoints without fragile `npx` wrappers where possible.
* **Self-hosted models first** — First-class **/auth** presets for **LM Studio** and **Ollama** (and other OpenAI-compatible local servers).

---

## Desktop downloads

Pre-built desktop binaries are published on the **[Releases](https://github.com/Null3nter/qwen-code-local/releases)** page (latest prerelease: `desktop-v0.1.0-rc.2`).

| Platform | Package |
| :--- | :--- |
| **Windows (x64)** | `Qwen-Code-Desktop_*_x64-setup.exe` |
| **macOS (Apple Silicon)** | `Qwen-Code-Desktop_*_aarch64.dmg` |
| **Linux (Debian / Ubuntu)** | `Qwen-Code-Desktop_*_amd64.deb` |
| **Linux (AppImage)** | `Qwen-Code-Desktop_*_amd64.AppImage` |

Builds are **unsigned** (expected for this fork). Windows SmartScreen / macOS Gatekeeper may warn; use “More info → Run anyway” or remove quarantine as documented on the release notes.

---

## Support & contributing

* **Bugs / feature requests:** [github.com/Null3nter/qwen-code-local/issues](https://github.com/Null3nter/qwen-code-local/issues)
* **Pull requests:** [github.com/Null3nter/qwen-code-local/pulls](https://github.com/Null3nter/qwen-code-local/pulls)
* **Contributing guide:** [CONTRIBUTING.md](./CONTRIBUTING.md)
* **Security:** [SECURITY.md](./SECURITY.md)

Clone this fork:

```bash
git clone https://github.com/Null3nter/qwen-code-local.git
cd qwen-code-local
```

---

## License

See [LICENSE](./LICENSE). This project is derived from upstream Qwen Code; the upstream project remains the property of its respective owners. This fork is unofficial.
