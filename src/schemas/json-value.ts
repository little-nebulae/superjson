import type { SuperJSONResult } from "superjson";

import { z } from "zod";

export const JSONValueSchema = z
  .json()
  .transform((value) => value as SuperJSONResult["json"]);
