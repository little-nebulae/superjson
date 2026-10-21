import { unwrap } from "@little-nebulae/result";
import { sc2Match, sc2Replay } from "test/fixtures";
import { assert, describe, expect, test } from "vitest";

import { superjsonCreateCodec } from "@/ops/create-codec";
import { superjsonDecode } from "@/ops/decode";
import { superjsonEncodeWithDiagnostics } from "@/ops/encode/with-diagnostics";
import { DetailedSuperJSONResultSchema } from "@/schemas/result";

const codec = unwrap(superjsonCreateCodec());

// Success cases
describe("superjsonEncodeWithDiagnostics should succeed", () => {
  test("at losslessly encoding data types that are supported by JSON.stringify and return a value that satisfies the DetailedSuperJSONResultSchema", () => {
    const result = unwrap(
      superjsonEncodeWithDiagnostics({ input: sc2Match, codec }),
    );
    assert(result.lossy === false);
    expect(result.output.json).toStrictEqual(sc2Match);
    expect(result.output.meta).toBeUndefined();

    const parsedResult =
      DetailedSuperJSONResultSchema<typeof sc2Match>().parse(result);
    expect(parsedResult).toStrictEqual(result);
  });

  test("at losslessly encoding additional data types that are supported by SuperJSON  and return a value that satisfies the DetailedSuperJSONResultSchema", () => {
    const result = unwrap(
      superjsonEncodeWithDiagnostics({ input: sc2Replay, codec }),
    );
    assert(result.lossy === false);
    const output = result.output;
    expect(output.meta).toBeDefined();
    const input = unwrap(superjsonDecode({ output, codec }));
    expect(input).toStrictEqual(sc2Replay);

    const parsedResult =
      DetailedSuperJSONResultSchema<typeof sc2Replay>().parse(result);
    expect(parsedResult).toStrictEqual(result);
  });
});
