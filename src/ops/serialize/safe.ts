import type { UnexpectedError } from "@little-nebulae/error";
import type { Result } from "@little-nebulae/result";

import { succeed } from "@little-nebulae/result";
import { prettifyError, z } from "zod";

import type { SafeSuperJSONResult } from "@/schemas/safe-result";

import { superjsonSerialize } from "@/ops/serialize";

export function superjsonSerializeSafe<T>(
  value: T,
): Result<SafeSuperJSONResult, UnexpectedError> {
  const serializeResult = superjsonSerialize(value);
  if (!serializeResult.success) {
    return serializeResult;
  }
  const superjsonResult = serializeResult.data;

  const parseJsonResult = z.json().safeParse(superjsonResult.json);

  const safeSuperjsonResult: SafeSuperJSONResult = {
    serialization: superjsonResult,
    validation: {
      json: parseJsonResult.success
        ? { success: parseJsonResult.success }
        : {
            success: parseJsonResult.success,
            error: prettifyError(parseJsonResult.error),
          },
    },
  };

  if (superjsonResult.meta && superjsonResult.meta.values) {
    const parseMetaValuesResult = z
      .json()
      .safeParse(superjsonResult.meta.values);
    safeSuperjsonResult.validation.metaValues = parseMetaValuesResult.success
      ? { success: parseMetaValuesResult.success }
      : {
          success: parseMetaValuesResult.success,
          error: prettifyError(parseMetaValuesResult.error),
        };
  }

  return succeed(safeSuperjsonResult);
}
