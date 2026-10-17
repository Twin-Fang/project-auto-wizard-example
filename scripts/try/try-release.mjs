// npm run try:release: check repository > prepare develop > choose change > commit, push, PR > wait for Release
import { readFileSync, writeFileSync } from "node:fs";
import { CHANGE_KINDS, readVersion, predictNextVersion, findGreetingToAdd, addGreeting, buildCommitMessage } from "./release-plan.mjs";
import { chooseMessages, TEMPLATE_REPOSITORY } from "./messages.mjs";
import { bold, green, printStep, printSuccess, printStop, chooseOption, runCommand, sleep } from "./terminal.mjs";

const GREET_FILE = "src/greet.js";
// Release PR flow usually finishes in 1-3 minutes; the limits leave room for queued runners
const MERGE_TIMEOUT_MILLISECONDS = 6 * 60 * 1000;
const RELEASE_TIMEOUT_MILLISECONDS = 4 * 60 * 1000;
const POLL_INTERVAL_MILLISECONDS = 10 * 1000;
// gh repo view viewerPermission values that allow pushing
const WRITE_PERMISSIONS = ["ADMIN", "MAINTAIN", "WRITE"];

const { text } = await chooseMessages(process.argv.slice(2));
const repository = checkRepository();
prepareDevelopBranch();
const plan = await chooseChange();
const pullRequestUrl = commitAndOpenPullRequest(plan);
await waitForRelease(pullRequestUrl);

// Stops with the command's own error output when a step fails
function runOrStop(command, commandArguments) {
  const result = runCommand(command, commandArguments);
  if (!result.isOk) {
    printStop([`${command} ${commandArguments.join(" ")}`, result.stderr || result.stdout]);
    process.exit(1);
  }
  return result.stdout;
}

// Own copy with write access and a clean working tree (template itself > copy guide)
function checkRepository() {
  printStep(1, text.stepCount, text.checkTitle, text.checkExplain);
  const view = runCommand("gh", ["repo", "view", "--json", "nameWithOwner,viewerPermission,url"]);
  if (!view.isOk) {
    printStop(text.ghMissing);
    process.exit(1);
  }
  const { nameWithOwner, viewerPermission, url } = JSON.parse(view.stdout);
  if (nameWithOwner === TEMPLATE_REPOSITORY || !WRITE_PERMISSIONS.includes(viewerPermission)) {
    printStop(text.notCopied(nameWithOwner));
    process.exit(0);
  }
  if (runOrStop("git", ["status", "--porcelain"]) !== "") {
    printStop(text.dirtyTree);
    process.exit(1);
  }
  printSuccess(text.checkOk(nameWithOwner));
  return { nameWithOwner, url };
}

// develop missing on the remote > create from main and push; otherwise switch and update
function prepareDevelopBranch() {
  printStep(2, text.stepCount, text.branchTitle, text.branchExplain);
  runOrStop("git", ["fetch", "--quiet", "origin"]);
  const hasRemoteDevelop = runOrStop("git", ["ls-remote", "--heads", "origin", "develop"]) !== "";
  if (!hasRemoteDevelop) {
    runOrStop("git", ["switch", "--quiet", "-C", "develop", "origin/main"]);
    runOrStop("git", ["push", "--quiet", "-u", "origin", "develop"]);
    printSuccess(text.branchCreated);
    return;
  }
  runOrStop("git", ["switch", "--quiet", "develop"]);
  runOrStop("git", ["pull", "--quiet", "--ff-only"]);
  // Catch up with the version commits on main when possible (skipped when histories diverged)
  runCommand("git", ["merge", "--quiet", "--ff-only", "origin/main"]);
  if (!runCommand("git", ["merge-base", "origin/main", "HEAD"]).isOk) {
    printStop(text.unrelatedHistory);
    process.exit(1);
  }
  printSuccess(text.branchReady);
}

// Change kind menu with the version each kind leads to
async function chooseChange() {
  const currentVersion = readVersion(runOrStop("git", ["show", "origin/main:version.yml"]));
  printStep(3, text.stepCount, text.changeTitle, text.changeExplain(currentVersion));
  const greetSource = readFileSync(GREET_FILE, "utf8");
  const greeting = findGreetingToAdd(greetSource);
  if (!greeting) {
    printStop(text.noGreetingLeft);
    process.exit(0);
  }
  const predict = (changeKind) => predictNextVersion(currentVersion, changeKind);
  const changeKind = CHANGE_KINDS[await chooseOption(text.changeQuestion, text.changeOptions(currentVersion, predict))];
  return {
    updatedSource: addGreeting(greetSource, greeting),
    commitMessage: buildCommitMessage(changeKind, greeting),
  };
}

// Commit on develop > push > reuse the open develop -> main PR or open one
function commitAndOpenPullRequest(plan) {
  printStep(4, text.stepCount, text.commitTitle, text.commitExplain(GREET_FILE, bold(plan.commitMessage)));
  writeFileSync(GREET_FILE, plan.updatedSource);
  runOrStop("git", ["add", GREET_FILE]);
  runOrStop("git", ["commit", "--quiet", "-m", plan.commitMessage]);
  runOrStop("git", ["push", "--quiet", "origin", "develop"]);
  printSuccess(text.pushed);
  const openPullRequestUrl = runOrStop("gh", ["pr", "list", "--base", "main", "--head", "develop", "--state", "open", "--json", "url", "--jq", ".[0].url"]);
  const pullRequestUrl = openPullRequestUrl || runOrStop("gh", [
    "pr", "create", "--base", "main", "--head", "develop",
    "--title", "Release", "--body", "Opened by `npm run try:release`.",
  ]);
  printSuccess(text.pullRequestOpened(pullRequestUrl));
  return pullRequestUrl;
}

// Polls until the condition returns a value or the time runs out (null), printing a dot per poll
async function pollUntil(label, timeoutMilliseconds, readCondition) {
  process.stdout.write(`      ${label} `);
  const deadline = Date.now() + timeoutMilliseconds;
  while (Date.now() < deadline) {
    const value = readCondition();
    if (value) {
      process.stdout.write("\n");
      return value;
    }
    process.stdout.write(".");
    await sleep(POLL_INTERVAL_MILLISECONDS);
  }
  process.stdout.write("\n");
  return null;
}

// PR merged by the bot > version confirmed on main > its tag released > links to the results
async function waitForRelease(pullRequestUrl) {
  const actionsUrl = `${repository.url}/actions`;
  printStep(5, text.stepCount, text.waitTitle, text.waitExplain(actionsUrl));
  const isMerged = await pollUntil(text.waitingMerge, MERGE_TIMEOUT_MILLISECONDS, () =>
    runCommand("gh", ["pr", "view", pullRequestUrl, "--json", "state", "--jq", ".state"]).stdout === "MERGED");
  if (!isMerged) {
    printStop(text.timeout(actionsUrl));
    process.exit(1);
  }
  printSuccess(text.merged);
  // The merge brings the bot's "confirm vX.Y.Z" commit, so main's version.yml names the tag to wait for
  runOrStop("git", ["fetch", "--quiet", "origin", "main"]);
  const newTag = `v${readVersion(runOrStop("git", ["show", "origin/main:version.yml"]))}`;
  const releaseUrl = await pollUntil(text.waitingRelease, RELEASE_TIMEOUT_MILLISECONDS, () =>
    runCommand("gh", ["release", "view", newTag, "--json", "url", "--jq", ".url"]).stdout);
  if (!releaseUrl) {
    printStop(text.timeout(actionsUrl));
    process.exit(1);
  }
  console.log(`\n${green(bold(`✓ ${text.doneTitle(newTag)}`))}`);
  for (const line of text.doneLinks(releaseUrl, repository.url)) console.log(`  ${line}`);
  console.log("");
}
