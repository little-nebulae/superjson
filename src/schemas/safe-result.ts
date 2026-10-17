import { z } from "zod";

import { SuperJSONResultSchema } from "@/schemas/result";

export const SafeSuperJSONResultSchema = z.object({
  serialization: SuperJSONResultSchema,
  validation: z.object({
    json: z.discriminatedUnion("success", [
      z.object({ success: true }),
      z.object({ success: false, error: z.string() }),
    ]),
    metaValues: z
      .discriminatedUnion("success", [
        z.object({ success: true }),
        z.object({ success: false, error: z.string() }),
      ])
      .exactOptional(),
  }),
});

export type SafeSuperJSONResult = z.infer<typeof SafeSuperJSONResultSchema>;
