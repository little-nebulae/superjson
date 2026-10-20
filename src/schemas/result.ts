import type { SuperJSONResult } from "superjson";

import { ZodIssueSchema } from "@little-nebulae/zod-schemas";
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

export const RichSuperJSONResultSchema = z.discriminatedUnion("safe", [
  z.object({ safe: z.literal(true), result: SuperJSONResultSchema }),
  z.object({
    safe: z.literal(false),
    result: z.object({
      ...SuperJSONResultSchema.shape,
      json: z.custom<SuperJSONResult>(), // Intentionally no validation
    }),
    issues: z.array(ZodIssueSchema),
  }),
]);
export type RichSuperJSONResult = z.infer<typeof RichSuperJSONResultSchema>;
