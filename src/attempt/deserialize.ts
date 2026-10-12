import type { GetTagMetadata } from "type-fest";

import {
  composeErrorMessage,
  DEFAULT_FAILURE_REASON,
  UnexpectedError,
} from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { deserialize } from "superjson";

import type { SuperJSONResultOf, SuperJSONResultOfTagName } from "@/types";

export function attemptDeserialize<T extends SuperJSONResultOf<unknown>>(
  value: T,
  inPlace: boolean = false,
) {
  return attempt({
    tryFn: () =>
      deserialize(value, { inPlace }) as GetTagMetadata<
        T,
        SuperJSONResultOfTagName
      >,
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "deserialize value",
          reason: DEFAULT_FAILURE_REASON,
        }),
        cause: error,
        meta: { inPlace },
      }),
  });
}
