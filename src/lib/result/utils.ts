import type { FlatError } from "@little-nebulae/error";
import type { JsonValue } from "type-fest";

import { createJsonFailure } from "@little-nebulae/result";

import type {
  AsyncEncodedResult,
  EncodedData,
  EncodedResult,
  EncodedSuccess,
} from "@/lib/result/types";

export function createEncodedSuccess<TData extends EncodedData<unknown>>(
  data: TData,
): EncodedSuccess<TData> {
  return { success: true, data };
}

export function produceEncodedResult<
  TData extends EncodedData<unknown>,
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
  TData extends EncodedData<unknown>,
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
