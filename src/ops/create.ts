import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import SuperJSON from "superjson";

import type { CustomSuperJSON } from "@/types";

import { ERROR_TRANSFORMER_NAME, errorTransformer } from "@/transformers/error";

export function createCustomSuperJSON() {
  return attempt({
    tryFn: () => {
      const instance = new SuperJSON();
      instance.registerCustom(errorTransformer, ERROR_TRANSFORMER_NAME);
      return instance as CustomSuperJSON;
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "create a custom SuperJSON instance",
        }),
        cause: error,
        meta: null,
      }),
  });
}
