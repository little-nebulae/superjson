import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

import type {
  SuperJSONCodec,
  SuperJSONResultOf,
  SuperJSONValue,
} from "@/types";

export function superjsonSerialize<T extends SuperJSONValue>({
  input,
  codec,
}: {
  input: T;
  codec: SuperJSONCodec;
}) {
  return attempt({
    tryFn: () => {
      const output = codec.serialize(input);
      return output as SuperJSONResultOf<T>;
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "serialize input with superjson",
        }),
        cause: error,
        meta: null,
      }),
  });
}
