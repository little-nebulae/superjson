import type { SuperJSONResult } from "superjson";
import type { Tagged } from "type-fest";

export type JSONValue = SuperJSONResult["json"];

export type SuperJSONResultOfTagName = "SuperJSONResultOf";
export type SuperJSONResultOf<T> = Tagged<
  SuperJSONResult,
  SuperJSONResultOfTagName,
  T
>;
