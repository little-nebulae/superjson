import { unwrap } from "@little-nebulae/result";
import { SuperJSON } from "superjson";
import { sc2Error, sc2Match, sc2Replay } from "test/fixtures";
import { assert, describe, expect, test } from "vitest";

import { superjsonDecode } from "@/ops/decode";
import { superjsonEncode } from "@/ops/encode";

const superjson = new SuperJSON();

// Success cases
describe("superjsonEncode and superjsonDecode should succeed", () => {
  test("at handling data types supported by JSON.stringify", () => {
    const fixture = sc2Match;

    const output = unwrap(superjsonEncode({ input: fixture, superjson }));
    expect(output).toStrictEqual({ json: fixture });

    expect(() => JSON.stringify(output)).not.toThrow();

    const input = unwrap(superjsonDecode({ output, superjson }));
    expect(input).toStrictEqual(fixture);
  });

  test("at handling additional data types that are not supported by JSON.stringify but supported by them (this test doesn't cover error)", () => {
    const fixture = sc2Replay;

    const output = unwrap(superjsonEncode({ input: fixture, superjson }));
    expect(output.meta).toBeDefined();

    expect(() => JSON.stringify(output)).not.toThrow();

    const input = unwrap(superjsonDecode({ output, superjson }));
    expect(input).toStrictEqual(fixture);
  });

  test("at handling instance of Error and the result will be supported by JSON.stringify but it will be lossy", () => {
    const fixture = sc2Error;

    const output = unwrap(superjsonEncode({ input: fixture, superjson }));
    expect(output.meta).toBeDefined();

    const json = output.json;
    expect(json).not.toMatchObject(fixture);
    expect(json).toStrictEqual({
      name: fixture.name,
      message: fixture.message,
    });

    expect(() => JSON.stringify(output)).not.toThrow();

    const input = unwrap(superjsonDecode({ output, superjson }));
    assert(input instanceof Error);
    expect(input).toMatchObject(fixture);
    expect(input).not.toStrictEqual(fixture);
    expect(Object.hasOwn(input, "name")).toBe(true);
    expect(Object.hasOwn(fixture, "name")).toBe(false);
  });
});
