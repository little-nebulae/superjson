import { unwrap } from "@little-nebulae/result";
import { expectTypeOf, test } from "vitest";

import { attemptDeserialize } from "@/attempt/deserialize";
import { attemptSerialize } from "@/attempt/serialize";

test("attemptDeserialize should recover the original type passed to attemptSerialize", () => {
  const object = {
    normal: "string",
    timestamp: new Date(),
    test: /superjson/,
  };
  const serializeResult = unwrap(attemptSerialize(object));
  const deserializeResult = unwrap(attemptDeserialize(serializeResult));
  expectTypeOf(deserializeResult).toEqualTypeOf(object);
});
