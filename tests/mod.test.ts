import { assert, assertEquals } from "jsr:@std/assert@0.220.1";
import { pathToFileURL } from "node:url";
import * as infer from "../mod.ts";

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
    await infer.getFromUrl(pathToFileURL(file));
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
