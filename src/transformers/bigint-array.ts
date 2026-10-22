import type { CustomTransformer } from "@/types";

type BigIntArray = BigInt64Array | BigUint64Array;

function createBigIntArrayTransformer<T extends BigIntArray>({
  isInstance,
  construct,
}: {
  isInstance: (value: unknown) => value is T;
  construct: (values: bigint[]) => T;
}): CustomTransformer<T, string[]> {
  return {
    isApplicable: isInstance,
    serialize: (value) => Array.from(value, (n) => n.toString()),
    deserialize: (value) => construct(value.map((s) => BigInt(s))),
  };
}

export const bigInt64ArrayTransformer = createBigIntArrayTransformer({
  isInstance: (value) => value instanceof BigInt64Array,
  construct: (values) => new BigInt64Array(values),
});
export const BIG_INT_64_ARRAY_TRANSFORMER_NAME = "bigInt64ArrayTransformer";

export const bigUint64ArrayTransformer = createBigIntArrayTransformer({
  isInstance: (value) => value instanceof BigUint64Array,
  construct: (values) => new BigUint64Array(values),
});
export const BIG_UINT_64_ARRAY_TRANSFORMER_NAME = "bigUint64ArrayTransformer";
