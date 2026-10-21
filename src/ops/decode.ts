import type { GetTagMetadata } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

import type {
  SuperJSONCodec,
  SuperJSONResultOf,
  SuperJSONResultOfTagName,
} from "@/types";

export function superjsonDecode<T extends SuperJSONResultOf<unknown>>({
  output,
  codec,
  inPlace = false,
}: {
  output: T;
  codec: SuperJSONCodec;
  inPlace?: boolean;
}) {
  return attempt({
    tryFn: () => {
      const value = codec.deserialize<
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
