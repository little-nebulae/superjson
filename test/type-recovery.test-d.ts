import { unwrap } from "@little-nebulae/result";
import { expectTypeOf, test } from "vitest";

import { createSuperJSONCodec } from "@/ops/create";
import { superjsonDecode } from "@/ops/decode";
import { superjsonEncode } from "@/ops/encode";

test("superjsonDecode should recover the original type passed to superjsonEncode", () => {
  const input = {
    normal: "string",
    timestamp: new Date(),
    test: /superjson/,
  };
  const codec = unwrap(createSuperJSONCodec());
  const output = unwrap(superjsonEncode({ input, codec }));
  const decodedInput = unwrap(superjsonDecode({ output, codec }));
  expectTypeOf(decodedInput).toEqualTypeOf(input);
});
