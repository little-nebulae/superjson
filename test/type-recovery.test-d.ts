import { unwrap } from "@little-nebulae/result";
import { expectTypeOf, test } from "vitest";

import { createSuperJSON } from "@/ops/create";
import { superjsonDeserialize } from "@/ops/deserialize";
import { superjsonSerialize } from "@/ops/serialize";

test("superjsonDeserialize should recover the original type passed to superjsonSerialize", () => {
  const originalValue = {
    normal: "string",
    timestamp: new Date(),
    test: /superjson/,
  };
  const superjson = unwrap(createSuperJSON());
  const result = unwrap(
    superjsonSerialize({ value: originalValue, superjson }),
  );
  const deserializedValue = unwrap(superjsonDeserialize({ result, superjson }));
  expectTypeOf(deserializedValue).toEqualTypeOf(originalValue);
});
