import { unwrap } from "@little-nebulae/result";
import { deserialize } from "superjson";
import { sc2Match, sc2Replay } from "test/fixtures";
import { assert, describe, expect, test } from "vitest";

import { superjsonSerialize } from "@/ops/serialize";

// Success cases
describe("superjsonSerialize should succeed", () => {
  test("at serializing data types that are supported by JSON.stringify", () => {
    const result = superjsonSerialize(sc2Match);
    assert(result.success);
    expect(result.data.json).toStrictEqual(sc2Match);
    expect(result.data.meta).toBeUndefined();
  });

  test("at serializing additional data types that are supported by SuperJSON (this test doesn't cover Error)", () => {
    const superjsonResult = unwrap(superjsonSerialize(sc2Replay));
    expect(superjsonResult.meta).toBeDefined();
    const deserializedValue = deserialize(superjsonResult);
    expect(deserializedValue).toStrictEqual(sc2Replay);
  });
});
