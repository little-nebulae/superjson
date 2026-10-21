import type { GetTagMetadata } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt, unwrap } from "@little-nebulae/result";
import { deserialize } from "superjson";

import type {
  CustomSuperJSON,
  SuperJSONResultOf,
  SuperJSONResultOfTagName,
} from "@/types";

import { createSuperJSON } from "@/ops/create";

export function superjsonDeserialize<T extends SuperJSONResultOf<unknown>>({
  result,
  superjson,
  inPlace = false,
}: {
  result: T;
  superjson?: CustomSuperJSON;
  inPlace?: boolean;
}) {
  return attempt({
    tryFn: () => {
      const instance = superjson ?? unwrap(createSuperJSON());
      const value = instance.deserialize<
        GetTagMetadata<T, SuperJSONResultOfTagName>
      >(result, { inPlace });
      return value;
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "deserialize value with superjson",
        }),
        cause: error,
        meta: { inPlace },
      }),
  });
}
