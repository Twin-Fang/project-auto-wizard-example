// Pure helpers for `npm run try:release`: expected version, greeting to add, commit message

// Change kinds offered to the visitor: feat raises minor, fix raises patch, breaking raises major
export const CHANGE_KINDS = ["feat", "fix", "breaking"];

// Languages added one per run, in this order, skipping the ones already in GREETINGS
const CANDIDATE_GREETINGS = [
  { code: "es", word: "Hola", language: "Spanish" },
  { code: "fr", word: "Bonjour", language: "French" },
  { code: "de", word: "Hallo", language: "German" },
  { code: "it", word: "Ciao", language: "Italian" },
  { code: "pt", word: "Olá", language: "Portuguese" },
  { code: "sv", word: "Hej", language: "Swedish" },
  { code: "tr", word: "Merhaba", language: "Turkish" },
  { code: "zh", word: "你好", language: "Chinese" },
];

// `const GREETINGS = { en: "Hello", ... };` on one line, as in src/greet.js
const GREETINGS_LINE = /const GREETINGS = \{([^}]*)\};/;

// version.yml `version: "x.y.z"` > "x.y.z" (null when missing)
export function readVersion(versionYmlText) {
  const match = versionYmlText.match(/^version:\s*"?(\d+\.\d+\.\d+)/m);
  return match ? match[1] : null;
}

// Same bump rule as .github/scripts/version_manager.py (major resets minor and patch)
export function predictNextVersion(version, changeKind) {
  const [major, minor, patch] = version.split(".").map(Number);
  if (changeKind === "breaking") return `${major + 1}.0.0`;
  if (changeKind === "feat") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

// src/greet.js source > first candidate greeting not there yet (null when all are there)
export function findGreetingToAdd(greetSource) {
  const match = greetSource.match(GREETINGS_LINE);
  if (!match) return null;
  const existingCodes = new Set([...match[1].matchAll(/(\w+)\s*:/g)].map((entry) => entry[1]));
  return CANDIDATE_GREETINGS.find((greeting) => !existingCodes.has(greeting.code)) ?? null;
}

// Appends `code: "word"` at the end of GREETINGS, leaving the rest of the file untouched
export function addGreeting(greetSource, greeting) {
  return greetSource.replace(GREETINGS_LINE, (_line, entries) =>
    `const GREETINGS = {${entries.trimEnd()}, ${greeting.code}: "${greeting.word}" };`);
}

// The prefix decides the release: feat: minor, fix: patch, feat!: major
export function buildCommitMessage(changeKind, greeting) {
  if (changeKind === "fix") return `fix: add the missing ${greeting.language} greeting`;
  if (changeKind === "breaking") return `feat!: greet in ${greeting.language}`;
  return `feat: greet in ${greeting.language}`;
}
