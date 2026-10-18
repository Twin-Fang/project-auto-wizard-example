// Text for the try scripts in English and Korean, plus the language choice
import { chooseOption } from "./terminal.mjs";

export const TEMPLATE_REPOSITORY = "Twin-Fang/project-auto-wizard-example";
// Opens GitHub's "create a repository from this template" form
export const COPY_TEMPLATE_URL = "https://github.com/new?template_name=project-auto-wizard-example&template_owner=Twin-Fang";
export const GUIDE_URL = "https://twin-fang.github.io/project-auto-wizard/start/try-it/";

// How to get an own copy, shown when the release cannot run here
const COPY_STEPS = {
  en: [
    "To see a real release, copy the template to your account first:",
    `  1. Open ${COPY_TEMPLATE_URL}`,
    "  2. Pick your account, any name, Public, then Create repository.",
    "  3. In your new repository: Code > Codespaces > Create codespace on main.",
    "  4. Run npm run try:release there.",
    "Meanwhile you can try the installer right here: npm run try:install",
  ],
  ko: [
    "실제 릴리스를 보려면 먼저 템플릿을 내 계정으로 복사하세요.",
    `  1. ${COPY_TEMPLATE_URL} 을 엽니다.`,
    "  2. 내 계정, 아무 이름, Public을 고르고 Create repository를 누릅니다.",
    "  3. 새 레포에서 Code > Codespaces > Create codespace on main을 누릅니다.",
    "  4. 거기서 npm run try:release를 실행합니다.",
    "그동안 여기서는 설치 마법사를 체험할 수 있습니다: npm run try:install",
  ],
};

const MESSAGES = {
  en: {
    stepCount: 5,
    checkTitle: "Check the repository",
    checkExplain: ["The release runs in GitHub Actions of the repository this Codespace belongs to.", "That must be your own copy, so the bot can push and merge there."],
    checkOk: (repository) => `You can write to ${repository}.`,
    notCopied: (repository) => [`This Codespace belongs to ${repository}, which you cannot change.`, ...COPY_STEPS.en],
    templateCodespace: ["This Codespace was opened from the template, so it has no repository of its own yet.", ...COPY_STEPS.en],
    ghMissing: ["The gh command is not available or not signed in.", "Open this repository in GitHub Codespaces, where gh is ready to use."],
    dirtyTree: ["You have uncommitted changes in this folder.", "Commit or discard them first (Source Control panel on the left), then run again."],
    versionUnreadable: ["Could not read the version from version.yml on main.", "Keep version: \"x.y.z\" in version.yml (this example repo ships it), then run again."],
    branchTitle: "Prepare the develop branch",
    branchExplain: ["Work goes to develop. A pull request from develop to main is a release.", "This is the pr-flow branch strategy chosen at install time."],
    branchCreated: "Created develop from main and pushed it.",
    branchReady: "Switched to develop and pulled the latest commits.",
    unrelatedHistory: ["develop and main do not share history (the copy was made with Include all branches on).", "Delete the develop branch on GitHub (Branches page), then run again: it is recreated from main."],
    changeTitle: "Choose a change",
    changeExplain: (version) => [
      `The version on main is v${version}.`,
      "The prefix of the commit message decides the next version (Conventional Commits).",
    ],
    changeQuestion: "Which kind of change? (Enter = 1)",
    changeOptions: (version, predict) => [
      `feat:  a new feature      v${version} > v${predict("feat")}  (minor)`,
      `fix:   a bug fix          v${version} > v${predict("fix")}  (patch)`,
      `feat!: a breaking change  v${version} > v${predict("breaking")}  (major)`,
    ],
    noGreetingLeft: ["Every sample language is already in src/greet.js.", "Edit any file yourself, commit with a feat: or fix: message and open a PR from develop to main."],
    commitTitle: "Commit, push and open the release PR",
    commitExplain: (file, message) => [`Edits ${file} and commits it as:`, `  ${message}`],
    pushed: "Pushed develop.",
    pullRequestOpened: (url) => `Release PR: ${url}`,
    waitTitle: "Watch GitHub Actions release it",
    waitExplain: (actionsUrl) => [
      "On the PR, the workflows confirm the version, write the release notes and CHANGELOG, then merge.",
      "After the merge they create the tag and the GitHub Release. This takes about one to three minutes.",
      `Follow along live: ${actionsUrl}`,
    ],
    waitingMerge: "Waiting for the bot to merge the PR",
    merged: "The bot merged the release PR.",
    waitingRelease: "Waiting for the GitHub Release",
    timeout: (actionsUrl) => [
      "Nothing finished within the expected time.",
      `Open ${actionsUrl} and check the latest run: its last lines say what blocked it.`,
      `Troubleshooting: ${GUIDE_URL}#if-something-does-not-happen`,
    ],
    doneTitle: (tag) => `Released ${tag}`,
    doneLinks: (releaseUrl, repositoryUrl) => [
      `Release:   ${releaseUrl}`,
      `CHANGELOG: ${repositoryUrl}/blob/main/CHANGELOG.md`,
      `README:    ${repositoryUrl}#readme  (the version line at the bottom)`,
      "",
      "Run npm run try:release again and choose another kind to compare the versions.",
      "When you are done, delete this Codespace: github.com/codespaces > ... > Delete.",
    ],
    installSampleQuestion: "Which kind of project should the wizard set up? (Enter = 1)",
    installSampleOptions: ["Node (package.json)", "Spring (build.gradle)", "Python (pyproject.toml)"],
    installStepCount: 3,
    installSampleTitle: "Create a sample project",
    installSampleCreated: (folder) => `Created ${folder} (a new git repository, nothing is pushed).`,
    installWizardTitle: "Run the installer",
    installWizardExplain: [
      "This is the real `npx project-auto-wizard`, the same command you would run in your own project.",
      "Use the arrow keys and Enter. The default answers are fine.",
    ],
    installPressEnter: "Press Enter to start the wizard...",
    installWizardFailed: "The wizard stopped before finishing. You can run it again: npm run try:install",
    installResultTitle: "See what was installed",
    installResultExplain: (folder) => [`Files the wizard created or changed in ${folder}:`],
    installNext: [
      "These workflows run in GitHub Actions once they are pushed to a repository.",
      "The Secrets the wizard listed are for deploying to a real server; this try needs none of them.",
      "To see a real release: copy this template and run npm run try:release in your copy.",
      `Guide: ${GUIDE_URL}`,
    ],
  },
  ko: {
    stepCount: 5,
    checkTitle: "레포 확인",
    checkExplain: ["릴리스는 이 Codespace가 속한 레포의 GitHub Actions에서 일어납니다.", "봇이 push하고 머지할 수 있도록 내 계정의 복사본이어야 합니다."],
    checkOk: (repository) => `${repository}에 쓸 수 있습니다.`,
    notCopied: (repository) => [`이 Codespace는 ${repository} 레포에 속해 있고, 이 레포는 바꿀 수 없습니다.`, ...COPY_STEPS.ko],
    templateCodespace: ["이 Codespace는 템플릿에서 바로 연 것이라 아직 내 레포가 없습니다.", ...COPY_STEPS.ko],
    ghMissing: ["gh 명령이 없거나 로그인되어 있지 않습니다.", "gh가 준비되어 있는 GitHub Codespaces에서 이 레포를 열어 주세요."],
    dirtyTree: ["이 폴더에 커밋하지 않은 변경이 있습니다.", "왼쪽 Source Control에서 커밋하거나 되돌린 뒤 다시 실행하세요."],
    versionUnreadable: ["main의 version.yml에서 버전을 읽지 못했습니다.", "version.yml에 version: \"x.y.z\" 줄이 있어야 합니다(이 예제 레포에는 들어 있습니다). 확인한 뒤 다시 실행하세요."],
    branchTitle: "develop 브랜치 준비",
    branchExplain: ["작업은 develop에 올립니다. develop에서 main으로 가는 PR이 곧 릴리스입니다.", "설치할 때 고른 pr-flow 브랜치 전략입니다."],
    branchCreated: "main에서 develop을 만들어 push했습니다.",
    branchReady: "develop으로 바꾸고 최신 커밋을 받았습니다.",
    unrelatedHistory: ["develop과 main의 기록이 이어져 있지 않습니다 (Include all branches를 켜고 복사한 경우).", "GitHub의 Branches 화면에서 develop을 지운 뒤 다시 실행하세요. main에서 새로 만듭니다."],
    changeTitle: "변경 종류 고르기",
    changeExplain: (version) => [
      `main의 현재 버전은 v${version}입니다.`,
      "커밋 메시지 앞머리(Conventional Commits)가 다음 버전을 정합니다.",
    ],
    changeQuestion: "어떤 변경을 할까요? (Enter = 1)",
    changeOptions: (version, predict) => [
      `feat:  새 기능      v${version} > v${predict("feat")}  (minor)`,
      `fix:   버그 수정    v${version} > v${predict("fix")}  (patch)`,
      `feat!: 호환 깨짐    v${version} > v${predict("breaking")}  (major)`,
    ],
    noGreetingLeft: ["준비된 샘플 언어가 src/greet.js에 모두 들어 있습니다.", "아무 파일이나 직접 고쳐 feat: 또는 fix: 메시지로 커밋하고 develop에서 main으로 PR을 여세요."],
    commitTitle: "커밋, push, 릴리스 PR 열기",
    commitExplain: (file, message) => [`${file} 파일을 고치고 아래 메시지로 커밋합니다.`, `  ${message}`],
    pushed: "develop을 push했습니다.",
    pullRequestOpened: (url) => `릴리스 PR: ${url}`,
    waitTitle: "GitHub Actions가 릴리스하는 과정 보기",
    waitExplain: (actionsUrl) => [
      "PR에서 워크플로우가 버전을 확정하고, 릴리스 노트와 CHANGELOG를 쓰고, 머지합니다.",
      "머지 뒤에는 태그와 GitHub Release를 만듭니다. 보통 1~3분 걸립니다.",
      `실시간으로 보기: ${actionsUrl}`,
    ],
    waitingMerge: "봇이 PR을 머지하기를 기다리는 중",
    merged: "봇이 릴리스 PR을 머지했습니다.",
    waitingRelease: "GitHub Release를 기다리는 중",
    timeout: (actionsUrl) => [
      "예상 시간 안에 끝나지 않았습니다.",
      `${actionsUrl} 에서 가장 최근 실행을 열어 보세요. 마지막 줄에 무엇이 막았는지 나옵니다.`,
      `문제 해결: ${GUIDE_URL.replace("/start/", "/ko/start/")}`,
    ],
    doneTitle: (tag) => `${tag} 릴리스 완료`,
    doneLinks: (releaseUrl, repositoryUrl) => [
      `Release:   ${releaseUrl}`,
      `CHANGELOG: ${repositoryUrl}/blob/main/CHANGELOG.md`,
      `README:    ${repositoryUrl}#readme  (맨 아래 버전 줄)`,
      "",
      "npm run try:release를 다시 실행해 다른 종류를 골라 버전이 어떻게 바뀌는지 비교해 보세요.",
      "다 끝나면 이 Codespace를 지우세요: github.com/codespaces > ... > Delete",
    ],
    installSampleQuestion: "마법사가 어떤 프로젝트에 설치할까요? (Enter = 1)",
    installSampleOptions: ["Node (package.json)", "Spring (build.gradle)", "Python (pyproject.toml)"],
    installStepCount: 3,
    installSampleTitle: "샘플 프로젝트 만들기",
    installSampleCreated: (folder) => `${folder} 폴더를 만들었습니다 (새 git 레포, 아무것도 push하지 않음).`,
    installWizardTitle: "설치 마법사 실행",
    installWizardExplain: [
      "내 프로젝트에서 실행하는 것과 똑같은 진짜 `npx project-auto-wizard`입니다.",
      "화살표 키와 Enter로 고릅니다. 기본값 그대로 진행해도 됩니다.",
    ],
    installPressEnter: "Enter를 누르면 마법사를 시작합니다...",
    installWizardFailed: "마법사가 끝나기 전에 멈췄습니다. 다시 실행할 수 있습니다: npm run try:install",
    installResultTitle: "설치된 것 보기",
    installResultExplain: (folder) => [`마법사가 ${folder}에 만들거나 바꾼 파일입니다.`],
    installNext: [
      "이 워크플로우는 레포에 push되면 GitHub Actions에서 실행됩니다.",
      "마법사가 안내한 Secret은 실제 서버 배포용이라 이번 체험에는 필요 없습니다.",
      "실제 릴리스를 보려면 이 템플릿을 복사하고, 복사본에서 npm run try:release를 실행하세요.",
      `가이드: ${GUIDE_URL.replace("/start/", "/ko/start/")}`,
    ],
  },
};

// --lang en|ko > TRY_LANG env > ask (Enter = English)
export async function chooseMessages(commandArguments) {
  const languageIndex = commandArguments.indexOf("--lang");
  const requestedLanguage = languageIndex >= 0 ? commandArguments[languageIndex + 1] : process.env.TRY_LANG;
  if (requestedLanguage in MESSAGES) return { language: requestedLanguage, messages: MESSAGES[requestedLanguage] };
  const chosenIndex = await chooseOption("Language / 언어 (Enter = English)", ["English", "한국어"]);
  const language = chosenIndex === 1 ? "ko" : "en";
  return { language, messages: MESSAGES[language] };
}
