import { describe, expect, test } from "vitest";

import { SuperJSONCodec } from "@/codec";

// Constructor
describe("SuperJSONCodec's constructor should", () => {
  // Success cases
  describe("succeed", () => {
    test("without throwing any exception", () => {
      expect(() => new SuperJSONCodec()).not.toThrow();
    });
  });
});
