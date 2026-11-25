import type { SuperJSON } from "superjson";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { produceResult } from "@little-nebulae/result";

import type { SuperJSONResultOf } from "@/types/tagged";
import type { SuperJSONValue } from "@/types/values";

export function superjsonEncode<T extends SuperJSONValue>({
  input,
  superjson,
}: {
  input: T;
  superjson: SuperJSON;
}) {
  return produceResult({
    tryFn: () => {
      const output = superjson.serialize(input);
      return output as SuperJSONResultOf<T>;
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "encode input with superjson",
        }),
        cause: error,
        meta: null,
      }),
  });
}
