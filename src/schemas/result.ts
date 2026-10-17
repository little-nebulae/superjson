import type { SuperJSONResult } from "superjson";

import { z } from "zod";

export const SuperJSONResultSchema = z
  .strictObject({
    json: z.unknown(),
    meta: z
      .strictObject({
        values: z.unknown(),
        referentialEqualities: z.union([
          z.record(z.string(), z.array(z.string())),
          z.tuple([z.array(z.string())]),
          z.tuple([
            z.array(z.string()),
            z.record(z.string(), z.array(z.string())),
          ]),
        ]),
        v: z.number(),
      })
      .exactPartial()
      .exactOptional(),
  })
  .transform((value) => value as SuperJSONResult);
