import { deserialize, serialize } from "superjson";
import { sc2Error, sc2Match, sc2Replay } from "test/fixtures";
import { assert, describe, expect, test } from "vitest";

// Success cases
describe("superjson should succeed", () => {
  test("at handling data types supported by JSON.stringify", () => {
    const fixture = sc2Match;

    const result = serialize(fixture);
    expect(result).toStrictEqual({ json: fixture });

    expect(() => JSON.stringify(result)).not.toThrow();

    const value = deserialize(result);
    expect(value).toStrictEqual(fixture);
  });

  test("at handling additional data types that are not supported by JSON.stringify but supported by it (this test doesn't cover error)", () => {
    const fixture = sc2Replay;

    const result = serialize(fixture);
    expect(result.meta).toBeDefined();

    expect(() => JSON.stringify(result)).not.toThrow();

    const value = deserialize(result);
    expect(value).toStrictEqual(fixture);
  });

  test("at handling instance of Error and the result will be supported by JSON.stringify but it will be lossy", () => {
    const fixture = sc2Error;

    const result = serialize(fixture);
    expect(result.meta).toBeDefined();
    const json = result.json;
    expect(json).not.toMatchObject(fixture);
    expect(json).toStrictEqual({
      name: fixture.name,
      message: fixture.message,
    });

    expect(() => JSON.stringify(result)).not.toThrow();

    const value = deserialize(result);
    assert(value instanceof Error);
    expect(value).toMatchObject(fixture);
    expect(value).not.toStrictEqual(fixture);
    expect(Object.hasOwn(value, "name")).toBe(true);
    expect(Object.hasOwn(fixture, "name")).toBe(false);
  });
});
