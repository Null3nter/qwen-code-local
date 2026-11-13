# GitHub without NPX (`github-direct`)

This fork includes a **built-in GitHub MCP server** that uses the **same Node binary as the app** (desktop bundle or system). It does **not** use `npx`.

## Why not the Express `CLIENT_SECRET` snippet?

Shipping `GITHUB_CLIENT_SECRET` inside a desktop installer is unsafe — anyone can extract it. For local/desktop use prefer:

1. **Personal Access Token** (simplest), or  
2. **Device Flow OAuth** (public client id only, no secret)

## Enable with a token

```bash
# PowerShell
$env:GITHUB_TOKEN = "ghp_xxxxxxxx"

# bash
export GITHUB_TOKEN=ghp_xxxxxxxx
```

Or save the token to `~/.qwen/github-token` (created by the device-login helper).

When a token is present and you have not configured MCP servers named `github` or `github-direct`, the app auto-registers **`github-direct`**.

## Device flow login helper

```bash
export GITHUB_CLIENT_ID=your_oauth_app_client_id
node packages/core/vendor/github-mcp/github-device-login.mjs
```

Create an OAuth App at https://github.com/settings/developers and enable **Device Flow**.

## Tools

`github_get_me`, `github_list_repos`, `github_get_repo`, `github_get_file`, `github_list_issues`, `github_create_issue`, `github_list_pulls`, `github_search_code`

## Disable

Configure your own `mcpServers.github`, or add `github-direct` to `mcp.excluded`.
