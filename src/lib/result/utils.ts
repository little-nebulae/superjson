import type { EncodedData, EncodedSuccess } from "@/lib/result/types";

export function createEncodedSuccess<TData extends EncodedData<unknown>>(
  data: TData,
): EncodedSuccess<TData> {
  return { success: true, data };
}
