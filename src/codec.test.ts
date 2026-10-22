import { unwrap } from "@little-nebulae/result";
import {
  sc2BigIntTypedArrays,
  sc2Match,
  sc2NestedError,
  sc2Replay,
} from "test/fixtures";
import { assert, describe, expect, test } from "vitest";

import { SuperJSONCodec } from "@/codec";

// Constructor
test("SuperJSONCodec's constructor should not throw any exception", () => {
  expect(() => new SuperJSONCodec()).not.toThrow();
});

const codec = new SuperJSONCodec();

// encode-decode methods
describe("SuperJSONCodec's encode-decode methods should", () => {
  // Success cases
  describe("succeed", () => {
    test("at handling data types supported by JSON.stringify", () => {
      const fixture = sc2Match;

      const output = unwrap(codec.encode({ input: fixture }));
      expect(output).toStrictEqual({ json: fixture });

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });

    test("at handling additional data types that are not supported by JSON.stringify but supported by superjson (this test doesn't cover error)", () => {
      const fixture = sc2Replay;

      const output = unwrap(codec.encode({ input: fixture }));
      expect(output.meta).toBeDefined();

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });

    test("at handling nested error", () => {
      const fixture = sc2NestedError;

      const output = unwrap(codec.encode({ input: fixture }));
      expect(output.meta).toBeDefined();

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });

    test("at handling bigint typed arrays", () => {
      const fixture = sc2BigIntTypedArrays;

      const output = unwrap(codec.encode({ input: fixture }));
      expect(output.meta).toBeDefined();

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });
  });
});

// encodeUnknown method
describe("SuperJSONCodec's encodeUnknown method should", () => {
  // JSON-safe cases
  describe("return a json-safe result when", () => {
    test("handling data types supported by JSON.stringify", () => {
      const fixture = sc2Match;

      const detailedResult = unwrap(codec.encodeUnknown({ input: fixture }));
      assert(detailedResult.jsonSafe);

      const output = detailedResult.output;
      expect(output).toStrictEqual({ json: fixture });

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });

    test("handling additional data types that are not supported by JSON.stringify but supported by superjson (this test doesn't cover error)", () => {
      const fixture = sc2Replay;

      const detailedResult = unwrap(codec.encodeUnknown({ input: fixture }));
      assert(detailedResult.jsonSafe);

      const output = detailedResult.output;
      expect(output.meta).toBeDefined();

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });
  });
});
