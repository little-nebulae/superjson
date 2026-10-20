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
