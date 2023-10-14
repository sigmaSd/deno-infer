import { instantiate, Type as wasmType } from "./lib/rs_lib.generated.js";

export type MatcherType =
  | "App"
  | "Archive"
  | "Audio"
  | "Book"
  | "Doc"
  | "Font"
  | "Image"
  | "Text"
  | "Video"
  | "Custom";

const wasmModule = await instantiate();

export class Type {
  inner: wasmType;
  constructor(inner: wasmType) {
    this.inner = inner;
  }

  public extension(): string {
    return this.inner.extension();
  }
  public matcherType(): MatcherType {
    switch (this.inner.matcher_type()) {
      case 0:
        return "App";
      case 1:
        return "Archive";
      case 2:
        return "Audio";
      case 3:
        return "Book";
      case 4:
        return "Doc";
      case 5:
        return "Font";
      case 6:
        return "Image";
      case 7:
        return "Text";
      case 8:
        return "Video";
      case 9:
        return "Custom";
      default:
        throw "unreachable!";
    }
  }
  public mimeType(): string {
    return this.inner.mime_type();
  }
  //TODO: overwrite toString
  // the obvious way didn't work
}

/** Returns the file type of the buffer. */
export function get(buf: Uint8Array): Type | undefined {
  const wasmType = wasmModule.get(buf);
  if (wasmType === undefined) return;
  return new Type(wasmType);
}

/** Returns the file type of the file given a path. */
export function getFromPath(path: string): Type | undefined {
  // NOTE: read: true is the default, but seems there is a dnt bug
  const file = Deno.openSync(path, { read: true });
  const limit = Math.min(file.statSync().size, 8192) + 1;
  const bytes = new Uint8Array(limit);
  file.readSync(bytes);
  file.close();

  return get(bytes);
}
