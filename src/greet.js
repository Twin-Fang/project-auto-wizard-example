// Greeting word per language; unknown languages fall back to English
const GREETINGS = { en: "Hello", ko: "안녕하세요", ja: "こんにちは" };

// Returns a greeting for the given name in the given language
export function greet(name = "world", lang = "en") {
  const word = GREETINGS[lang] ?? GREETINGS.en;
  // Surrounding spaces in user input are not part of the name
  return `${word}, ${String(name).trim()}!`;
}
