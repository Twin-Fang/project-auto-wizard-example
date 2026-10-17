// Terminal helpers for the try scripts: styled output, numbered choices, command runner
import { spawnSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

// ANSI styles; plain text when the output is not a terminal
const isColorEnabled = stdout.isTTY && !process.env.NO_COLOR;
const style = (code) => (text) => (isColorEnabled ? `\x1b[${code}m${text}\x1b[0m` : text);
export const bold = style("1");
export const dim = style("2");
export const green = style("32");
export const yellow = style("33");
export const cyan = style("36");

// "Step 2/5  Title" followed by indented explanation lines
export function printStep(stepNumber, stepCount, title, explanationLines = []) {
  console.log(`\n${cyan(bold(`[${stepNumber}/${stepCount}]`))} ${bold(title)}`);
  for (const line of explanationLines) console.log(`      ${line}`);
}

export function printSuccess(text) {
  console.log(`      ${green("✓")} ${text}`);
}

export function printStop(lines) {
  console.log("");
  for (const line of lines) console.log(`${yellow("!")} ${line}`);
  console.log("");
}

// Numbered menu > chosen index (Enter picks the first option)
export async function chooseOption(question, optionLabels) {
  const readline = createInterface({ input: stdin, output: stdout });
  try {
    console.log(`\n${bold(question)}`);
    optionLabels.forEach((label, index) => console.log(`  ${cyan(String(index + 1))}) ${label}`));
    for (;;) {
      const answer = (await readline.question(dim("> "))).trim();
      if (answer === "") return 0;
      const chosenNumber = Number(answer);
      if (Number.isInteger(chosenNumber) && chosenNumber >= 1 && chosenNumber <= optionLabels.length) {
        return chosenNumber - 1;
      }
    }
  } finally {
    readline.close();
  }
}

export async function waitForEnter(prompt) {
  const readline = createInterface({ input: stdin, output: stdout });
  try {
    await readline.question(dim(prompt));
  } finally {
    readline.close();
  }
}

// Runs a command and captures its output (isOk false on a non-zero exit or a missing command)
export function runCommand(command, commandArguments, { cwd, input } = {}) {
  const result = spawnSync(command, commandArguments, { cwd, input, encoding: "utf8" });
  return {
    isOk: result.status === 0,
    stdout: (result.stdout ?? "").trim(),
    stderr: (result.stderr ?? result.error?.message ?? "").trim(),
  };
}

// Runs a command attached to this terminal (for the interactive wizard)
export function runInteractive(command, commandArguments, { cwd } = {}) {
  return spawnSync(command, commandArguments, { cwd, stdio: "inherit" }).status === 0;
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
