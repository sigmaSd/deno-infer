import assert from "node:assert";
import * as infer from "@sigmasd/deno-infer";

const type = infer.get(
  new TextEncoder().encode(
    "PK\x03\x04", // zip magic string,
  ),
);

assert(type);

console.log(type.extension());
console.log(type.matcherType());
console.log(type.mimeType());
