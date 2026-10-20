import type { Result } from "@little-nebulae/result";

import {
  composeErrorMessage,
  DEFAULT_FAILURE_REASON,
  UnexpectedError,
} from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { ZodIssueSchema } from "@little-nebulae/zod-schemas";
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
      if (
        z.json().validate(issues) &&
        z.array(ZodIssueSchema).validate(issues)
      ) {
        return {
          lossless: false,
          result: superjsonResult as SuperJSONResultOf<T>,
          issues: { format: "raw", value: issues },
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
          reason: DEFAULT_FAILURE_REASON,
        }),
        cause: error,
        meta: null,
      }),
  });
}
