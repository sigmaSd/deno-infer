import { assertEquals } from "https://deno.land/std@0.204.0/assert/assert_equals.ts";
import * as infer from "../mod.ts";
import { assert } from "https://deno.land/std@0.204.0/assert/assert.ts";
import { pathToFileURL } from "node:url";

Deno.test("smoke", async () => {
  {
    const file = Deno.makeTempFileSync();
    Deno.writeTextFileSync(file, "#!/bin/sh");

    const type = infer.get(Deno.readFileSync(file));
    assert(type);

    assertEquals(type.extension(), "sh");
    assertEquals(type.matcherType(), "Text");
    assertEquals(type.mimeType(), "text/x-shellscript");
  }
  {
    const file = Deno.makeTempFileSync();
    Deno.writeTextFileSync(file, "#!/bin/sh");

    const type = await infer.getFromPath(file);
    // make sure also using it on a url works
    await infer.getFromPath(pathToFileURL(file));
    assert(type);

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
