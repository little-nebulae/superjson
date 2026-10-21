import type { Result } from "@little-nebulae/result";
import type { ZodIssue } from "@little-nebulae/zod-schemas";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { z } from "zod";

import type { DetailedSuperJSONResult } from "@/schemas/result";
import type {
  SuperJSONCodec,
  SuperJSONResultOf,
  SuperJSONValue,
} from "@/types";

export function superjsonEncodeWithDiagnostics<T extends SuperJSONValue>({
  input,
  codec,
}: {
  input: T;
  codec: SuperJSONCodec;
}): Result<DetailedSuperJSONResult<T>, UnexpectedError> {
  return attempt({
    tryFn: () => {
      const output = codec.serialize(input);
      const parseJsonResult = z
        .json()
        .safeParse(output, { reportInput: false });
      if (parseJsonResult.success) {
        return { lossy: false, output: output as SuperJSONResultOf<T> };
      }
      const error = parseJsonResult.error;
      const issues = error.issues;
      if (z.json().validate(issues)) {
        return {
          lossy: true,
          output,
          issues: { format: "raw", value: issues as ZodIssue[] },
        };
      }
      return {
        lossy: true,
        output,
        issues: { format: "pretty", value: z.prettifyError(error) },
      };
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "use superjson to encode input with diagnostics",
        }),
        cause: error,
        meta: null,
      }),
  });
}
