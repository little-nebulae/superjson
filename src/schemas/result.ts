import type { SuperJSONResult } from "superjson";

import { z } from "zod";

export const ReferentialEqualityAnnotationsSchema = z.union([
  z.record(z.string(), z.array(z.string())),
  z.tuple([z.array(z.string())]),
  z.tuple([z.array(z.string()), z.record(z.string(), z.array(z.string()))]),
]);

export const SuperJSONResultSchema = z
  .object({
    json: z.unknown(),
    meta: z
      .object({
        values: z.unknown(),
        referentialEqualities: ReferentialEqualityAnnotationsSchema,
        v: z.number(),
      })
      .exactPartial()
      .exactOptional(),
  })
  .transform((value) => value as SuperJSONResult);
