import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import SuperJSON from "superjson";

import type { SuperJSONCodec } from "@/types";

import { ERROR_TRANSFORMER_NAME, errorTransformer } from "@/transformers/error";

export function createSuperJSONCodec() {
  return attempt({
    tryFn: () => {
      const codec = new SuperJSON();
      codec.registerCustom(errorTransformer, ERROR_TRANSFORMER_NAME);
      return codec as SuperJSONCodec;
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "create a custom SuperJSON instance (codec)",
        }),
        cause: error,
        meta: null,
      }),
  });
}
