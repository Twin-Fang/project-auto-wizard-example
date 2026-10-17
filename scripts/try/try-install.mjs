// npm run try:install: sample project in a temp folder > real wizard > list of installed files
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chooseMessages } from "./messages.mjs";
import { printStep, printSuccess, printStop, chooseOption, waitForEnter, runCommand, runInteractive } from "./terminal.mjs";

// Minimal files the wizard detects per project type (same order as installSampleOptions)
const SAMPLE_PROJECTS = [
  { type: "node", files: { "package.json": '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "private": true\n}\n' } },
  { type: "spring", files: { "build.gradle": 'group = "com.example"\nversion = "1.0.0"\n', "settings.gradle": 'rootProject.name = "my-app"\n' } },
  { type: "python", files: { "pyproject.toml": '[project]\nname = "my-app"\nversion = "1.0.0"\n' } },
];
// Commit identity for the sample's first commit only (works even where git has no user configured)
const SAMPLE_GIT_IDENTITY = ["-c", "user.name=try-install", "-c", "user.email=try-install@example.com"];

const { language, text } = await chooseMessages(process.argv.slice(2));
const sampleFolder = await createSampleProject();
await runWizard(sampleFolder);
showInstalledFiles(sampleFolder);

// Chosen sample > new git repository with one commit, so the wizard's changes show up in git status
async function createSampleProject() {
  printStep(1, text.installStepCount, text.installSampleTitle);
  const sample = SAMPLE_PROJECTS[await chooseOption(text.installSampleQuestion, text.installSampleOptions)];
  const folder = mkdtempSync(join(tmpdir(), `try-${sample.type}-`));
  writeFileSync(join(folder, "README.md"), "# my-app\n");
  for (const [fileName, content] of Object.entries(sample.files)) writeFileSync(join(folder, fileName), content);
  for (const gitArguments of [["init", "--quiet", "-b", "main"], ["add", "."], [...SAMPLE_GIT_IDENTITY, "commit", "--quiet", "-m", "chore: initial commit"]]) {
    const result = runCommand("git", gitArguments, { cwd: folder });
    if (!result.isOk) {
      printStop([`git ${gitArguments.join(" ")}`, result.stderr]);
      process.exit(1);
    }
  }
  printSuccess(text.installSampleCreated(folder));
  return folder;
}

// The published CLI, run attached to this terminal in the sample folder
async function runWizard(folder) {
  printStep(2, text.installStepCount, text.installWizardTitle, text.installWizardExplain);
  await waitForEnter(`      ${text.installPressEnter}`);
  if (!runInteractive("npx", ["--yes", "project-auto-wizard@latest", "--lang", language], { cwd: folder })) {
    printStop([text.installWizardFailed]);
    process.exit(1);
  }
}

// New and modified paths in the sample since its first commit
function showInstalledFiles(folder) {
  printStep(3, text.installStepCount, text.installResultTitle, text.installResultExplain(folder));
  const changedPaths = runCommand("git", ["ls-files", "--others", "--modified", "--exclude-standard"], { cwd: folder }).stdout;
  for (const path of changedPaths.split("\n").filter(Boolean)) printSuccess(path);
  console.log("");
  for (const line of text.installNext) console.log(`  ${line}`);
  console.log("");
}
