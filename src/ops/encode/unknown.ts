import type { Result } from "@little-nebulae/result";
import type { ZodIssue } from "@little-nebulae/zod-schemas";
import type { SuperJSON } from "superjson";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { z } from "zod";

import type { DetailedSuperJSONResult } from "@/schemas/result";
import type { SuperJSONResultOf } from "@/types";

export function superjsonEncodeUnknown<T>({
  input,
  superjson,
}: {
  input: T;
  superjson: SuperJSON;
}): Result<DetailedSuperJSONResult<T>, UnexpectedError> {
  return attempt({
    tryFn: () => {
      const output = superjson.serialize(input) as SuperJSONResultOf<T>;
      const parseJsonResult = z
        .json()
        .safeParse(output, { reportInput: false });
      if (parseJsonResult.success) {
        return { jsonSafe: true, output };
      }
      const error = parseJsonResult.error;
      const issues = error.issues;
      if (z.json().validate(issues)) {
        return {
          jsonSafe: false,
          output,
          issues: { format: "raw", value: issues as ZodIssue[] },
        };
      }
      return {
        jsonSafe: false,
        output,
        issues: { format: "pretty", value: z.prettifyError(error) },
      };
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "encode unknown input with superjson",
        }),
        cause: error,
        meta: null,
      }),
  });
}
