# Infer

Infer file type. This is a wasm bindings to https://github.com/bojand/infer. It
should work cross runtime.

## Usage

## Examples

**Example 1**

```ts
import * as infer from "@sigmasd/deno-infer";

const type = infer.get(
  new TextEncoder().encode(
    "PK\x03\x04", // zip magic string,
  ),
);

console.log(type.extension());
console.log(type.matcherType());
console.log(type.mimeType());
```

## Browser

Browser and runtimes that dont support wasm import can use the `inline` module
which have the wasm file inlined.

```ts
import * as infer from "jsr:@sigmasd/deno-infer/inline";
```
