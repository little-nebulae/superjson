import { z } from "zod";

import { JSONValueSchema } from "@/schemas/result/json";
import { ReferentialEqualityAnnotationsSchema } from "@/schemas/result/meta/referential-equality-annotations";
import { MinimisedTypeAnnotationTreeSchema } from "@/schemas/result/meta/values/minimised-tree";

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
