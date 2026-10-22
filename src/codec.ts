import { SuperJSON } from "superjson";

import type {
  CustomSuperJSON,
  SuperJSONResultOf,
  SuperJSONValue,
} from "@/types";

import { superjsonDecode } from "@/ops/decode";
import { superjsonEncode } from "@/ops/encode";
import { superjsonEncodeUnknown } from "@/ops/encode/unknown";
import {
  BIG_INT_64_ARRAY_TRANSFORMER_NAME,
  BIG_UINT_64_ARRAY_TRANSFORMER_NAME,
  bigInt64ArrayTransformer,
  bigUint64ArrayTransformer,
} from "@/transformers/bigint-array";
import { ERROR_TRANSFORMER_NAME, errorTransformer } from "@/transformers/error";

export class SuperJSONCodec {
  readonly #superjson: CustomSuperJSON;

  constructor() {
    const superjson = new SuperJSON();
    superjson.registerCustom(errorTransformer, ERROR_TRANSFORMER_NAME);
    superjson.registerCustom(
      bigInt64ArrayTransformer,
      BIG_INT_64_ARRAY_TRANSFORMER_NAME,
    );
    superjson.registerCustom(
      bigUint64ArrayTransformer,
      BIG_UINT_64_ARRAY_TRANSFORMER_NAME,
    );
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
