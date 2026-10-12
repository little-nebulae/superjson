import type { SuperJSONResult } from "superjson";

import { z } from "zod";

export const SuperJSONResultSchema = z
  .strictObject({
    json: z.json(),
    meta: z
      .strictObject({
        values: z.json(),
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
