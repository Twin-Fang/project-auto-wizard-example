import { test } from "node:test";
import assert from "node:assert";
import {
  readVersion,
  predictNextVersion,
  findGreetingToAdd,
  addGreeting,
  buildCommitMessage,
} from "../scripts/try/release-plan.mjs";

const GREET_SOURCE = `// Greeting word per language; unknown languages fall back to English
const GREETINGS = { en: "Hello", ko: "안녕하세요", ja: "こんにちは" };
`;

test("reads the version from version.yml", () => {
  assert.strictEqual(readVersion('# x.y.z\nversion: "0.2.2"\nversion_code: 4\n'), "0.2.2");
  assert.strictEqual(readVersion("version: 1.4.0\n"), "1.4.0");
  assert.strictEqual(readVersion("name: none\n"), null);
});

test("predicts the next version from the change kind", () => {
  assert.strictEqual(predictNextVersion("0.2.2", "feat"), "0.3.0");
  assert.strictEqual(predictNextVersion("0.2.2", "fix"), "0.2.3");
  assert.strictEqual(predictNextVersion("0.2.2", "breaking"), "1.0.0");
});

test("picks the first language that is not there yet", () => {
  assert.strictEqual(findGreetingToAdd(GREET_SOURCE).code, "es");
  const withSpanish = addGreeting(GREET_SOURCE, findGreetingToAdd(GREET_SOURCE));
  assert.strictEqual(findGreetingToAdd(withSpanish).code, "fr");
});

test("adds the greeting inside GREETINGS and keeps the rest", () => {
  const updated = addGreeting(GREET_SOURCE, { code: "es", word: "Hola", language: "Spanish" });
  assert.match(updated, /const GREETINGS = \{ en: "Hello", ko: "안녕하세요", ja: "こんにちは", es: "Hola" \};/);
  assert.match(updated, /^\/\/ Greeting word per language/);
});

test("returns null when every candidate language is already there", () => {
  let source = GREET_SOURCE;
  for (let greeting = findGreetingToAdd(source); greeting; greeting = findGreetingToAdd(source)) {
    source = addGreeting(source, greeting);
  }
  assert.strictEqual(findGreetingToAdd(source), null);
});

test("builds a conventional commit message per change kind", () => {
  const spanish = { code: "es", word: "Hola", language: "Spanish" };
  assert.strictEqual(buildCommitMessage("feat", spanish), "feat: greet in Spanish");
  assert.strictEqual(buildCommitMessage("fix", spanish), "fix: add the missing Spanish greeting");
  assert.strictEqual(buildCommitMessage("breaking", spanish), "feat!: greet in Spanish");
});
