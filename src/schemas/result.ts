import type { SuperJSONResult } from "superjson";

import { z } from "zod";

import { ReferentialEqualityAnnotationsSchema } from "@/schemas/result/meta/referential-equality-annotations";
import { MinimisedTypeAnnotationTreeSchema } from "@/schemas/result/meta/values/minimised-tree";

export const SuperJSONResultSchema = z
  .object({
    json: z.unknown(),
    meta: z
      .object({
        values: MinimisedTypeAnnotationTreeSchema,
        referentialEqualities: ReferentialEqualityAnnotationsSchema,
        v: z.number(),
      })
      .exactPartial()
      .exactOptional(),
  })
  .transform((value) => value as SuperJSONResult);
