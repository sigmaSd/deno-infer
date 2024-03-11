# Infer

Infer file type. This is a wasm bindings to https://github.com/bojand/infer. It
should work cross runtime.

## Usage

```ts
import * as infer from "jsr:@sigmasd/deno-infer";


const type = infer.get(
  new TextEncoder().encode(
    "PK\x03\x04", // zip magic string,
  ),
);

console.log(type.extension());
console.log(type.matcherType());
console.log(type.mimeType());
```
