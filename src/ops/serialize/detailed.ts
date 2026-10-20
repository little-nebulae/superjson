import type { Result } from "@little-nebulae/result";
import type { ZodIssue } from "@little-nebulae/zod-schemas";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { serialize } from "superjson";
import { z } from "zod";

import type { DetailedSuperJSONResult } from "@/schemas/result";
import type { SuperJSONResultOf } from "@/types";

export function superjsonDetailedSerialize<T>(
  value: T,
): Result<DetailedSuperJSONResult<T>, UnexpectedError> {
  return attempt({
    tryFn: () => {
      const superjsonResult = serialize(value);
      const parseJsonResult = z.json().safeParse(superjsonResult.json);
      if (parseJsonResult.success) {
        return {
          lossless: true,
          result: superjsonResult as SuperJSONResultOf<T>,
        };
      }
      const error = parseJsonResult.error;
      const issues = error.issues;
      if (z.json().validate(issues)) {
        return {
          lossless: false,
          result: superjsonResult as SuperJSONResultOf<T>,
          issues: { format: "raw", value: issues as ZodIssue[] },
        };
      }
      return {
        lossless: false,
        result: superjsonResult as SuperJSONResultOf<T>,
        issues: { format: "pretty", value: z.prettifyError(error) },
      };
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "serialize value in details",
        }),
        cause: error,
        meta: null,
      }),
  });
}
