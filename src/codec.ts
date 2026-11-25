import { SuperJSON } from "superjson";

import type { CustomSuperJSON } from "@/types/custom";
import type { SuperJSONResultOf } from "@/types/result-of";
import type { SuperJSONValue } from "@/types/values";

import { superjsonDecode } from "@/ops/decode";
import { superjsonEncode } from "@/ops/encode";
import { superjsonEncodeUnknown } from "@/ops/encode/unknown";
import { ERROR_TRANSFORMER_NAME, errorTransformer } from "@/transformers/error";

export class SuperJSONCodec {
  readonly #superjson: CustomSuperJSON;

  constructor() {
    const superjson = new SuperJSON();
    superjson.registerCustom(errorTransformer, ERROR_TRANSFORMER_NAME);
    this.#superjson = superjson as CustomSuperJSON;
  }

  encode<T extends SuperJSONValue>({ input }: { input: T }) {
    return superjsonEncode({ input, superjson: this.#superjson });
  }

  encodeUnknown<T>({ input }: { input: T }) {
    return superjsonEncodeUnknown({
      input,
      superjson: this.#superjson,
    });
  }

  decode<T extends SuperJSONResultOf<unknown>>({
    output,
    inPlace = false,
  }: {
    output: T;
    inPlace?: boolean;
  }) {
    return superjsonDecode({ output, inPlace, superjson: this.#superjson });
  }
}
