import type { SuperJSON, SuperJSONResult, registerCustom } from "superjson";
import type { Tagged } from "type-fest";

export type JSONValue = SuperJSONResult["json"];

export type SerializableJSONValue =
  | symbol
  | Set<SuperJSONValue>
  | Map<SuperJSONValue, SuperJSONValue>
  | undefined
  | bigint
  | Date
  | RegExp
  | URL
  | Error;

export interface SuperJSONArray extends Array<SuperJSONValue> {}
export interface SuperJSONObject {
  [key: string]: SuperJSONValue;
}
export type SuperJSONValue =
  | JSONValue
  | SerializableJSONValue
  | SuperJSONArray
  | SuperJSONObject;

export type SuperJSONResultOfTagName = "SuperJSONResultOf";
export type SuperJSONResultOf<T> = Tagged<
  SuperJSONResult,
  SuperJSONResultOfTagName,
  T
>;

export type CustomTransformer<Input, Output extends JSONValue> = Parameters<
  typeof registerCustom<Input, Output>
>[0];

export type CustomSuperJSON = Tagged<SuperJSON, "CustomSuperJSON">;
