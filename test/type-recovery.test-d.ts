import { unwrapResult } from "@little-nebulae/result";
import { SuperJSON } from "superjson";
import { expectTypeOf, test } from "vitest";

import { superjsonDecode } from "@/ops/decode";
import { superjsonEncode } from "@/ops/encode";

const superjson = new SuperJSON();

test("superjsonDecode should recover the original type passed to superjsonEncode", () => {
  const input = {
    normal: "string",
    timestamp: new Date(),
    test: /superjson/,
  };
  const output = unwrapResult(superjsonEncode({ input, superjson }));
  const decodedInput = unwrapResult(superjsonDecode({ output, superjson }));
  expectTypeOf(decodedInput).toEqualTypeOf(input);
});
