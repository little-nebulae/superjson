import type { registerCustom, SuperJSON, SuperJSONResult } from "superjson";
import type { Tagged } from "type-fest";

export type CustomTransformer<
  Input,
  Output extends SuperJSONResult["json"],
> = Parameters<typeof registerCustom<Input, Output>>[0];

export type CustomSuperJSON = Tagged<SuperJSON, "CustomSuperJSON">;
