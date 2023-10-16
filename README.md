# Infer (deno-wasm)

Deno wasm bindings to https://github.com/bojand/infer

https://www.npmjs.com/package/deno-infer

Should work with node as well

## Usage

```ts
import * as infer from "npm:deno-infer";

const file = Deno.readFileSync("filePath");
const type = infer.get(file);
// or this convinient method that reads only the start of the file
// const type = infer.getFromPath(file);
console.log(type.extension());
console.log(type.matcherType());
console.log(type.mimeType());
```
