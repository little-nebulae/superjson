import { unwrap } from "@little-nebulae/result";
import { sc2Match, sc2Replay } from "test/fixtures";
import { describe, expect, test } from "vitest";

import type { SuperJSONResultOf } from "@/types";

import { superjsonCreateCodec } from "@/ops/create-codec";
import { superjsonDecode } from "@/ops/decode";
import { superjsonEncode } from "@/ops/encode";
import { SuperJSONResultSchema } from "@/schemas/result";

const codec = unwrap(superjsonCreateCodec());

// Success cases
describe("superjsonEncode should succeed", () => {
  test("at encoding data types that are supported by JSON.stringify", () => {
    const output = unwrap(superjsonEncode({ input: sc2Match, codec }));
    expect(output.json).toStrictEqual(sc2Match);
    expect(output.meta).toBeUndefined();
  });

  test("at encoding additional data types that are supported by SuperJSON", () => {
    const output = unwrap(superjsonEncode({ input: sc2Replay, codec }));
    expect(output.meta).toBeDefined();
    const input = unwrap(superjsonDecode({ output, codec }));
    expect(input).toStrictEqual(sc2Replay);
  });

  test("at producing results that can be parsed by SuperJSONResultSchema", () => {
    const output = unwrap(superjsonEncode({ input: sc2Replay, codec }));
    const parsedOutput = SuperJSONResultSchema.transform(
      (value) => value as SuperJSONResultOf<typeof sc2Replay>,
    ).parse(output);
    const input = unwrap(superjsonDecode({ output: parsedOutput, codec }));
    expect(input).toStrictEqual(sc2Replay);
  });
});
