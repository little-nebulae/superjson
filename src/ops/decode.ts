import type { SuperJSON } from "superjson";
import type { GetTagMetadata } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

import type { SuperJSONResultOf, SuperJSONResultOfTagName } from "@/types";

export function superjsonDecode<T extends SuperJSONResultOf<unknown>>({
  output,
  superjson,
  inPlace = false,
}: {
  output: T;
  superjson: SuperJSON;
  inPlace?: boolean;
}) {
  return attempt({
    tryFn: () => {
      const value = superjson.deserialize<
        GetTagMetadata<T, SuperJSONResultOfTagName>
      >(output, { inPlace });
      return value;
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "decode output with superjson",
        }),
        cause: error,
        meta: { inPlace },
      }),
  });
}
