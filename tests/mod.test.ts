import { assertEquals } from "https://deno.land/std@0.204.0/assert/assert_equals.ts";
import * as infer from "../mod.ts";
import { assert } from "https://deno.land/std@0.204.0/assert/assert.ts";

Deno.test("smoke", () => {
  {
    const file = Deno.makeTempFileSync();
    Deno.writeTextFileSync(file, "#!/bin/sh");

    const type = infer.get(Deno.readFileSync(file));
    const type2 = infer.getFromPath(file);
    assert(type);
    assertEquals(type.mimeType(), type2?.mimeType());

    assertEquals(type.extension(), "sh");
    assertEquals(type.matcherType(), "Text");
    assertEquals(type.mimeType(), "text/x-shellscript");
  }

  const buf = new Uint8Array([0xFF, 0xD8, 0xFF, 0xAA]);
  const type = infer.get(buf);
  assert(type);

  assertEquals(type.extension(), "jpg");
  assertEquals(type.mimeType(), "image/jpeg");
});
