import type { SuperJSONResult } from "superjson";
import type { TypedArray } from "type-fest";

export type JSONValue = SuperJSONResult["json"];

export type SerializableJSONValue =
  | Set<SuperJSONValue>
  | Map<SuperJSONValue, SuperJSONValue>
  | undefined
  | bigint
  | Date
  | RegExp
  | URL
  | Error
  | TypedArray;

export interface SuperJSONArray extends Array<SuperJSONValue> {}
export interface SuperJSONObject {
  [key: string]: SuperJSONValue;
}
export type SuperJSONValue =
  | JSONValue
  | SerializableJSONValue
  | SuperJSONArray
  | SuperJSONObject;
