# project-auto-wizard example

A small Node project with release automation installed by [project-auto-wizard](https://github.com/Twin-Fang/project-auto-wizard). Nothing here is special to Node: the same workflows run for Spring, Flutter, React, Python and Go projects.

## See it

The history of this repository is real, produced by the installed GitHub Actions:

- [Pull requests](https://github.com/Twin-Fang/project-auto-wizard-example/pulls?q=is%3Apr): release PRs from `develop` to `main`, each with a release-notes comment, merged by the bot
- [Actions](https://github.com/Twin-Fang/project-auto-wizard-example/actions): the runs behind every release
- [Releases](https://github.com/Twin-Fang/project-auto-wizard-example/releases) and [CHANGELOG.md](CHANGELOG.md): tags and notes written from the commit messages

## Try it yourself, inside GitHub

Everything runs on GitHub: no install on your computer, no secrets. Each step is explained as it runs, in English or Korean.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Twin-Fang/project-auto-wizard-example?quickstart=1)

**1. Run the installer (2 minutes).** Click the button above. A Codespace (VS Code and a terminal in your browser) opens with [TRY-IT.md](TRY-IT.md). In the terminal run `npm run try:install`: the real wizard installs release automation into a sample Node, Spring or Python project.

**2. Cut a real release (5 minutes).** [Copy this template](https://github.com/new?template_name=project-auto-wizard-example&template_owner=Twin-Fang) to your account, then in your copy click **Code > Codespaces > Create codespace on main** and run `npm run try:release`. It creates `develop`, lets you pick `feat:`, `fix:` or `feat!:`, opens the release PR and waits until GitHub Actions has merged it and published the Release.

A Codespace uses the free monthly quota of your own GitHub account. Delete it at [github.com/codespaces](https://github.com/codespaces) when you are done.

Prefer clicking only? The same release works from GitHub's web UI: [Try it in your browser](https://twin-fang.github.io/project-auto-wizard/start/try-it/).

## What was installed

```bash
npx project-auto-wizard --mode full --force --type node
```

| Path | Purpose |
|---|---|
| `.github/workflows/PROJECT-COMMON-*.yaml` | Release automation (version confirm, release notes, CHANGELOG, tag and Release, README version line) |
| `.github/scripts/*.py` | The logic behind the workflows |
| `version.yml` | Single source of the version, branches and options |

Added for the try-out only (not installed by the wizard): `.devcontainer/`, `scripts/try/`, `TRY-IT.md`, `test/try-release-plan.test.js` and `.github/workflows/EXAMPLE-TESTS.yaml`.

---

<!-- AUTO-VERSION-SECTION: DO NOT EDIT MANUALLY -->
## Latest Version : v0.2.2 (2026-10-16)

[View full version history](CHANGELOG.md)
