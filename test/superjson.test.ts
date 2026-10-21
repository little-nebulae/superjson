import { deserialize, serialize } from "superjson";
import { sc2Match } from "test/fixtures";
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
});
