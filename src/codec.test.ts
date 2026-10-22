import { describe, expect, test } from "vitest";

import { SuperJSONCodec } from "@/codec";

// Constructor
describe("SuperJSONCodec's constructor", () => {
  // Success cases
  describe("should succeed", () => {
    test("without throwing any exception", () => {
      expect(() => new SuperJSONCodec()).not.toThrow();
    });
  });
});
