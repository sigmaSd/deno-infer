import { build, emptyDir } from "https://deno.land/x/dnt@0.38.1/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
    crypto: true,
  },
  compilerOptions: {
    lib: ["DOM", "ESNext"],
  },
  // only distribute ES module
  scriptModule: false,
  package: {
    // package.json properties
    name: "deno-infer",
    version: Deno.args[0],
    description: "Infer file and MIME type",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/sigmasd/deno-infer.git",
    },
    bugs: {
      url: "https://github.com/sigmasd/deno-infer/issues",
    },
  },
  async postBuild() {
    // make sure we build the wasm build before copying it
    await new Deno.Command("deno", { args: ["task", "build"] }).spawn().status;
    Deno.copyFileSync("lib/rs_lib_bg.wasm", "npm/esm/lib/rs_lib_bg.wasm");
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
