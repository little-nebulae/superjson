import type { SuperJSON } from "superjson";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

import type { SuperJSONResultOf, SuperJSONValue } from "@/types";

export function superjsonEncode<T extends SuperJSONValue>({
  input,
  superjson,
}: {
  input: T;
  superjson: SuperJSON;
}) {
  return attempt({
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
