import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt, unwrap } from "@little-nebulae/result";

import type {
  CustomSuperJSON,
  SuperJSONResultOf,
  SuperJSONValue,
} from "@/types";

import { createSuperJSON } from "@/ops/create";

export function superjsonSerialize<T extends SuperJSONValue>({
  value,
  superjson,
}: {
  value: T;
  superjson?: CustomSuperJSON;
}) {
  return attempt({
    tryFn: () => {
      const instance = superjson ?? unwrap(createSuperJSON());
      const result = instance.serialize(value);
      return result as SuperJSONResultOf<T>;
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "serialize with superjson",
        }),
        cause: error,
        meta: null,
      }),
  });
}
