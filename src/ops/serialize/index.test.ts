import { sc2Match } from "test/fixtures";
import { assert, describe, expect, test } from "vitest";

import { superjsonSerialize } from "@/index";

// Success cases
describe("superjsonSerialize should succeed", () => {
  test("at serializing data types that are supported by JSON.stringify", () => {
    const result = superjsonSerialize(sc2Match);
    assert(result.success);
    expect(result.data.json).toStrictEqual(sc2Match);
    expect(result.data.meta).toBeUndefined();
  });
});
