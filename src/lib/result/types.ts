import type { FlatError } from "@little-nebulae/error";
import type { JsonFailure, Success } from "@little-nebulae/result";
import type { JsonValue } from "type-fest";

import type { DetailedSuperJSONResult } from "@/schemas/result";
import type { SuperJSONResultOf } from "@/types/result-of";

export type EncodedData<T> = SuperJSONResultOf<T> | DetailedSuperJSONResult<T>;

export type AnyEncodedData = EncodedData<unknown>;

export interface EncodedSuccess<
  TData extends AnyEncodedData,
> extends Success<TData> {}

export type EncodedResult<
  TData extends AnyEncodedData,
  TError extends FlatError<string, JsonValue>,
> = EncodedSuccess<TData> | JsonFailure<TError>;

export type AsyncEncodedResult<
  TData extends AnyEncodedData,
  TError extends FlatError<string, JsonValue>,
> = Promise<EncodedResult<TData, TError>>;
