// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file

export function get(buf: Uint8Array): Type | undefined;
export enum MatcherType {
  App = 0,
  Archive = 1,
  Audio = 2,
  Book = 3,
  Doc = 4,
  Font = 5,
  Image = 6,
  Text = 7,
  Video = 8,
  Custom = 9,
}
export class Type {
  private constructor();
  free(): void;
  extension(): string;
  matcher_type(): MatcherType;
  mime_type(): string;
}
