import type { SuperJSONResult } from "superjson";

import {
  NonEmptyStringSchema,
  ZodIssueSchema,
} from "@little-nebulae/zod-schemas";
import { z } from "zod";

import type { SuperJSONResultOf } from "@/types";

import { JSONValueSchema } from "@/schemas/json-value";
import { MinimisedTypeAnnotationTreeSchema } from "@/schemas/minimised-tree";
import { ReferentialEqualityAnnotationsSchema } from "@/schemas/referential-equality-annotations";

export const SuperJSONResultSchema = z.object({
  json: JSONValueSchema,
  meta: z
    .object({
      values: MinimisedTypeAnnotationTreeSchema,
      referentialEqualities: ReferentialEqualityAnnotationsSchema,
      v: z.number(),
    })
    .exactPartial()
    .exactOptional(),
});

export function DetailedSuperJSONResultSchema<T>() {
  return z.discriminatedUnion("lossless", [
    z.object({
      lossless: z.literal(true),
      result: SuperJSONResultSchema.transform(
        (value) => value as SuperJSONResultOf<T>,
      ),
    }),
    z.object({
      lossless: z.literal(false),
      result: z
        .object({
          ...SuperJSONResultSchema.shape,
          json: z.custom<SuperJSONResult["json"]>(), // Intentionally no validation
        })
        .transform((value) => value as SuperJSONResultOf<T>),
      issues: z.discriminatedUnion("format", [
        z.object({ format: z.literal("raw"), value: z.array(ZodIssueSchema) }),
        z.object({ format: z.literal("pretty"), value: NonEmptyStringSchema }),
      ]),
    }),
  ]);
}
export type DetailedSuperJSONResult<T> = z.infer<
  ReturnType<typeof DetailedSuperJSONResultSchema<T>>
>;
