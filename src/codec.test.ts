import { SuperJSON } from "superjson";
import { describe, expect, test } from "vitest";

import { SuperJSONCodec } from "@/codec";

// Constructor
describe("SuperJSONCodec's constructor should", () => {
  // Success cases
  describe("succeed", () => {
    test("without throwing any exception", () => {
      expect(() => new SuperJSONCodec()).not.toThrow();
    });

    test("at creating an instance of the SuperJSON class as its superjson property", () => {
      const codec = new SuperJSONCodec();
      expect(codec.superjson).toBeInstanceOf(SuperJSON);
    });
  });
});
