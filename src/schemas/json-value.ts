import { z } from "zod";

import type { JSONValue } from "@/types/values";

export const JSONValueSchema = z
  .json()
  .transform((value) => value as JSONValue);
