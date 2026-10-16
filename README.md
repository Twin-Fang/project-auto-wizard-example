# project-auto-wizard example

A small Node project with release automation installed by [project-auto-wizard](https://github.com/Twin-Fang/project-auto-wizard). Nothing here is special to Node: the same workflows run for Spring, Flutter, React, Python and Go projects.

## See it

The history of this repository is real, produced by the installed GitHub Actions:

- [Pull requests](https://github.com/Twin-Fang/project-auto-wizard-example/pulls?q=is%3Apr): release PRs from `develop` to `main`, each with a release-notes comment, merged by the bot
- [Actions](https://github.com/Twin-Fang/project-auto-wizard-example/actions): the runs behind every release
- [Releases](https://github.com/Twin-Fang/project-auto-wizard-example/releases) and [CHANGELOG.md](CHANGELOG.md): tags and notes written from the commit messages

## Try it yourself (5 minutes, browser only)

1. Click **Use this template** > **Create a new repository**. Leave **Include all branches** off.
2. In your copy, open the branch menu, type `develop`, and choose **Create branch develop from main**.
3. On `develop`, edit `src/greet.js` and commit with a message starting with `feat:`.
4. Open a pull request from `develop` to `main`.
5. Within a minute the bot confirms the version, posts the release notes and merges. Check **Releases**.

The full guide, with what to check after each step: [Try it in your browser](https://twin-fang.github.io/project-auto-wizard/start/try-it/).

## What was installed

```bash
npx project-auto-wizard --mode full --force --type node
```

| Path | Purpose |
|---|---|
| `.github/workflows/PROJECT-COMMON-*.yaml` | Release automation (version confirm, release notes, CHANGELOG, tag and Release, README version line) |
| `.github/scripts/*.py` | The logic behind the workflows |
| `version.yml` | Single source of the version, branches and options |

---

<!-- AUTO-VERSION-SECTION: DO NOT EDIT MANUALLY -->
## Latest Version : v0.2.1 (2026-10-16)

[View full version history](CHANGELOG.md)
