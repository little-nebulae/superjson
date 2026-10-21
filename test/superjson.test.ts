import { deserialize, serialize } from "superjson";
import { sc2Match, sc2Replay } from "test/fixtures";
import { describe, expect, test } from "vitest";

// Success cases
describe("superjson should succeed", () => {
  test("at handling data types supported by JSON.stringify", () => {
    const result = serialize(sc2Match);
    expect(result).toStrictEqual({ json: sc2Match });
    expect(() => JSON.stringify(result)).not.toThrow();
    const value = deserialize(result);
    expect(value).toStrictEqual(sc2Match);
  });

  test("at handling additional data types that are not supported by JSON.stringify but supported by it (this test doesn't cover error)", () => {
    const result = serialize(sc2Replay);
    expect(result.meta).toBeDefined();
    expect(() => JSON.stringify(result)).not.toThrow();
    const value = deserialize(result);
    expect(value).toStrictEqual(sc2Replay);
  });
});
