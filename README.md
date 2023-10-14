# Infer (deno-wasm)

Deno wasm bindings to https://github.com/bojand/infer

## Usage

```ts
import * as infer from "npm:deno-infer";

const file = Deno.readFileSync("filePath");
const type = infer.get(file);
console.log(type.extension());
console.log(type.matcherType());
console.log(type.mimeType());
```
