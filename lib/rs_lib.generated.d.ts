// deno-lint-ignore-file
// deno-fmt-ignore-file

export interface InstantiateResult {
  instance: WebAssembly.Instance;
  exports: {
    get: typeof get;
    Type : typeof Type 
  };
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated(): boolean;

/** Options for instantiating a Wasm instance. */
export interface InstantiateOptions {
  /** Optional url to the Wasm file to instantiate. */
  url?: URL;
  /** Callback to decompress the raw Wasm file bytes before instantiating. */
  decompress?: (bytes: Uint8Array) => Uint8Array;
}

/** Instantiates an instance of the Wasm module returning its functions.
* @remarks It is safe to call this multiple times and once successfully
* loaded it will always return a reference to the same object. */
export function instantiate(opts?: InstantiateOptions): Promise<InstantiateResult["exports"]>;

/** Instantiates an instance of the Wasm module along with its exports.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object. */
export function instantiateWithInstance(opts?: InstantiateOptions): Promise<InstantiateResult>;

/**
* @param {Uint8Array} buf
* @returns {Type | undefined}
*/
export function get(buf: Uint8Array): Type | undefined;
/**
*/
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
/**
*/
export class Type {
  free(): void;
/**
* @returns {string}
*/
  extension(): string;
/**
* @returns {MatcherType}
*/
  matcher_type(): MatcherType;
/**
* @returns {string}
*/
  mime_type(): string;
}
