import type { FlatError } from "@little-nebulae/error";
import type { JsonValue } from "type-fest";

import { createJsonFailure } from "@little-nebulae/result";

import type {
  AnyEncodedData,
  AsyncEncodedResult,
  EncodedResult,
  EncodedSuccess,
} from "@/lib/result/types";

export function createEncodedSuccess<TData extends AnyEncodedData>(
  data: TData,
): EncodedSuccess<TData> {
  return { success: true, data };
}

export function produceEncodedResult<
  TData extends AnyEncodedData,
  TError extends FlatError<string, JsonValue>,
>({
  tryFn,
  catchFn,
  finallyFn,
}: {
  tryFn: () => TData;
  catchFn: (error: unknown) => TError;
  finallyFn?: () => void;
}): EncodedResult<TData, TError> {
  try {
    return createEncodedSuccess(tryFn());
  } catch (error) {
    return createJsonFailure(catchFn(error));
  } finally {
    finallyFn?.();
  }
}

export async function produceAsyncEncodedResult<
  TData extends AnyEncodedData,
  TError extends FlatError<string, JsonValue>,
>({
  tryFn,
  catchFn,
  finallyFn,
}: {
  tryFn: () => Promise<TData>;
  catchFn: (error: unknown) => TError;
  finallyFn?: () => void | Promise<void>;
}): AsyncEncodedResult<TData, TError> {
  try {
    return createEncodedSuccess(await tryFn());
  } catch (error) {
    return createJsonFailure(catchFn(error));
  } finally {
    await finallyFn?.();
  }
}

export function unwrapEncodedResult<
  TData extends AnyEncodedData,
  TError extends FlatError<string, JsonValue>,
>(result: EncodedResult<TData, TError>): TData {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

export async function unwrapAsyncEncodedResult<
  TData extends AnyEncodedData,
  TError extends FlatError<string, JsonValue>,
>(asyncResult: AsyncEncodedResult<TData, TError>): Promise<TData> {
  const result = await asyncResult;
  return unwrapEncodedResult(result);
}
