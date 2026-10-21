import { z } from "zod";

import type { JSONValue } from "@/types";

export const JSONValueSchema = z
  .json()
  .transform((value) => value as JSONValue);
