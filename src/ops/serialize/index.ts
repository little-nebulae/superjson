import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { serialize } from "superjson";

import type { SuperJSONResultOf } from "@/types";

export function superjsonSerialize<T>(value: T) {
  return attempt({
    tryFn: () => serialize(value) as SuperJSONResultOf<T>,
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "serialize value",
        }),
        cause: error,
        meta: null,
      }),
  });
}
