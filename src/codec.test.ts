import { unwrap } from "@little-nebulae/result";
import { sc2Match } from "test/fixtures";
import { describe, expect, test } from "vitest";

import { SuperJSONCodec } from "@/codec";

// Constructor
test("SuperJSONCodec's constructor should not throw any exception", () => {
  expect(() => new SuperJSONCodec()).not.toThrow();
});

// encode-decode methods
describe("SuperJSONCodec's encode-decode methods should", () => {
  const codec = new SuperJSONCodec();
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
  });
});
