import type { SuperJSONResult } from "superjson";

import {
  NonEmptyStringSchema,
  ZodIssueSchema,
} from "@little-nebulae/zod-schemas";
import { z } from "zod";

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

export const DetailedSuperJSONResultSchema = z.discriminatedUnion("lossless", [
  z.object({ lossless: z.literal(true), result: SuperJSONResultSchema }),
  z.object({
    lossless: z.literal(false),
    result: z.object({
      ...SuperJSONResultSchema.shape,
      json: z.custom<SuperJSONResult["json"]>(), // Intentionally no validation
    }),
    issues: z.discriminatedUnion("format", [
      z.object({ format: "raw", value: z.array(ZodIssueSchema) }),
      z.object({ format: "pretty", value: NonEmptyStringSchema }),
    ]),
  }),
]);
export type DetailedSuperJSONResult = z.infer<
  typeof DetailedSuperJSONResultSchema
>;
