import { assertEquals } from "https://deno.land/std@0.204.0/assert/assert_equals.ts";
import { get } from "../mod.ts";
import { assert } from "https://deno.land/std@0.204.0/assert/assert.ts";

Deno.test("smoke", () => {
  const file = Deno.makeTempFileSync();
  Deno.writeTextFileSync(file, "#!/bin/sh");

  const type = get(Deno.readFileSync(file));
  assert(type);

  assertEquals(type.extension(), "sh");
  assertEquals(type.matcherType(), "Text");
  assertEquals(type.mimeType(), "text/x-shellscript");
});
