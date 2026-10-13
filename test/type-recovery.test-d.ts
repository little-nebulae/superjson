import { unwrap } from "@little-nebulae/result";
import { expectTypeOf, test } from "vitest";

import { superjsonDeserialize } from "@/ops/deserialize";
import { superjsonSerialize } from "@/ops/serialize";

test("superjsonDeserialize should recover the original type passed to superjsonSerialize", () => {
  const object = {
    normal: "string",
    timestamp: new Date(),
    test: /superjson/,
  };
  const serializeResult = unwrap(superjsonSerialize(object));
  const deserializeResult = unwrap(superjsonDeserialize(serializeResult));
  expectTypeOf(deserializeResult).toEqualTypeOf(object);
});
