import { test } from "node:test";
import assert from "node:assert";
import { greet } from "../src/greet.js";

test("greets the given name", () => {
  assert.strictEqual(greet("wizard"), "Hello, wizard!");
});

test("greets in the given language", () => {
  assert.strictEqual(greet("wizard", "ko"), "안녕하세요, wizard!");
  assert.strictEqual(greet("wizard", "xx"), "Hello, wizard!");
});
