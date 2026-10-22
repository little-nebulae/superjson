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
  return z.discriminatedUnion("lossy", [
    z.object({
      lossy: z.literal(false),
      output: SuperJSONResultSchema.transform(
        (value) => value as SuperJSONResultOf<T>,
      ),
    }),
    z.object({
      lossy: z.literal(true),
      output: z
        .object({
          ...SuperJSONResultSchema.shape,
          json: z.unknown(),
        })
        .transform((value) => value as SuperJSONResultOf<unknown>),
      issues: z.discriminatedUnion("format", [
        z.object({
          format: z.literal("raw"),
          value: z.array(ZodIssueSchema),
        }),
        z.object({ format: z.literal("pretty"), value: NonEmptyStringSchema }),
      ]),
    }),
  ]);
}
export type DetailedSuperJSONResult<T> = z.infer<
  ReturnType<typeof DetailedSuperJSONResultSchema<T>>
>;
