# Try project-auto-wizard in GitHub Codespaces

[English](#english) · [한국어](#한국어)

## English

You are in a **Codespace**: VS Code and a Linux terminal running in your browser, on GitHub. Node.js, git and the `gh` command are already set up. Nothing is installed on your computer.

Open the terminal with **Ctrl + `** (or menu **Terminal > New Terminal**) and type one of these commands.

### 1. Run the installer on a sample project (2 minutes)

```bash
npm run try:install
```

1. Choose a language and a sample project (Node, Spring or Python).
2. The real `npx project-auto-wizard` starts in a temporary folder. Press **Enter** to accept each default.
3. At the end you see the list of files it installed: release workflows, their scripts and `version.yml`.

Nothing is pushed anywhere. Run it again to try another project type.

### 2. Cut a real release (5 minutes)

This needs **your own copy** of the repository, because the release runs in your repository's GitHub Actions.

1. Copy the template: [create a repository from it](https://github.com/new?template_name=project-auto-wizard-example&template_owner=Twin-Fang). Pick your account, any name and **Public**. Leave **Include all branches** off.
2. In your new repository click **Code > Codespaces > Create codespace on main**.
3. In its terminal run:

   ```bash
   npm run try:release
   ```

The script explains each step as it goes:

| Step | What happens |
|---|---|
| 1. Check | Confirms this is your copy and you can push to it |
| 2. Branch | Creates `develop` from `main` (work goes to `develop`, a PR to `main` is a release) |
| 3. Change | You pick `feat:`, `fix:` or `feat!:` and see the version each one leads to |
| 4. PR | It edits `src/greet.js`, commits, pushes and opens the `develop` > `main` pull request |
| 5. Release | GitHub Actions confirms the version, writes the notes and CHANGELOG, merges, then publishes a tag and a GitHub Release |

You get the links to the Release, `CHANGELOG.md` and the README version line. Run it again with another kind of change to compare.

### Cost and cleanup

- A Codespace uses the free monthly quota of **your** GitHub account (GitHub Free: 120 core-hours a month, about 60 hours on the default 2-core machine). Without a payment method on your account it stops at the quota and never bills you.
- When you are done, delete it on [github.com/codespaces](https://github.com/codespaces): **...** > **Delete**.

No terminal? The same release works with clicks only: [Try it in your browser](https://twin-fang.github.io/project-auto-wizard/start/try-it/).

## 한국어

지금 화면은 **Codespace**입니다. GitHub가 브라우저 안에 VS Code와 리눅스 터미널을 띄워 준 것이고, Node.js, git, `gh` 명령이 이미 준비되어 있습니다. 내 컴퓨터에는 아무것도 설치되지 않습니다.

**Ctrl + `** (또는 메뉴 **Terminal > New Terminal**)로 터미널을 열고 아래 명령 중 하나를 입력하세요.

### 1. 샘플 프로젝트에 설치 마법사 실행 (2분)

```bash
npm run try:install
```

1. 언어와 샘플 프로젝트(Node, Spring, Python)를 고릅니다.
2. 임시 폴더에서 진짜 `npx project-auto-wizard`가 시작됩니다. 질문마다 **Enter**를 누르면 기본값으로 진행됩니다.
3. 끝나면 설치된 파일 목록이 나옵니다. 릴리스 워크플로우, 그 스크립트, `version.yml`입니다.

어디에도 push하지 않습니다. 다시 실행해 다른 프로젝트 종류도 해 볼 수 있습니다.

### 2. 실제 릴리스 만들기 (5분)

릴리스는 내 레포의 GitHub Actions에서 일어나므로 **내 계정의 복사본**이 필요합니다.

1. 템플릿 복사: [이 템플릿으로 레포 만들기](https://github.com/new?template_name=project-auto-wizard-example&template_owner=Twin-Fang). 내 계정, 아무 이름, **Public**을 고르고 **Include all branches**는 끈 채로 둡니다.
2. 새 레포에서 **Code > Codespaces > Create codespace on main**을 누릅니다.
3. 열린 터미널에서 실행합니다.

   ```bash
   npm run try:release
   ```

스크립트가 단계마다 무엇을 하는지 설명하며 진행합니다.

| 단계 | 하는 일 |
|---|---|
| 1. 확인 | 내 복사본이고 push할 수 있는지 확인 |
| 2. 브랜치 | `main`에서 `develop`을 만듦 (작업은 `develop`에, `main`으로 가는 PR이 곧 릴리스) |
| 3. 변경 | `feat:`, `fix:`, `feat!:` 중 하나를 고르면 각각 어떤 버전이 되는지 보여 줌 |
| 4. PR | `src/greet.js`를 고쳐 커밋, push하고 `develop` > `main` PR을 엶 |
| 5. 릴리스 | GitHub Actions가 버전 확정, 릴리스 노트와 CHANGELOG 작성, 머지, 태그와 GitHub Release 발행 |

끝나면 Release, `CHANGELOG.md`, README 버전 줄 링크가 나옵니다. 다른 종류로 다시 실행해 버전 변화를 비교해 보세요.

### 비용과 정리

- Codespace는 **내** GitHub 계정의 월 무료 사용량에서 빠집니다(GitHub Free 기준 월 120 core-hours, 기본 2코어 머신으로 약 60시간). 계정에 결제 수단이 없으면 한도에서 멈추고 요금은 청구되지 않습니다.
- 다 쓴 뒤에는 [github.com/codespaces](https://github.com/codespaces)에서 **...** > **Delete**로 지웁니다.

터미널 없이 클릭만으로 같은 릴리스를 해 볼 수도 있습니다: [브라우저에서 직접 해 보기](https://twin-fang.github.io/project-auto-wizard/ko/start/try-it/)
