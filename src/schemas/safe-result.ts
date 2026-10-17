import { z } from "zod";

import { SuperJSONResultSchema } from "@/schemas/result";

export const SafeSuperJSONResultSchema = z.object({
  serialization: SuperJSONResultSchema,
  validation: z.discriminatedUnion("success", [
    z.object({ success: true }),
    z.object({ success: false, error: z.string() }),
  ]),
});
