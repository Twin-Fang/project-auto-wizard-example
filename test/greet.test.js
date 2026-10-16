import { test } from "node:test";
import assert from "node:assert";
import { greet } from "../src/greet.js";

test("greets the given name", () => {
  assert.strictEqual(greet("wizard"), "Hello, wizard!");
});
