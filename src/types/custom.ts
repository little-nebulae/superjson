import type { registerCustom, SuperJSON } from "superjson";
import type { Tagged } from "type-fest";

import type { JSONValue } from "@/types/values";

export type CustomTransformer<Input, Output extends JSONValue> = Parameters<
  typeof registerCustom<Input, Output>
>[0];

export type CustomSuperJSON = Tagged<SuperJSON, "CustomSuperJSON">;
