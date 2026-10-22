import { expect, test } from "vitest";

import { SuperJSONCodec } from "@/codec";

// Constructor
test("SuperJSONCodec's constructor should not throw any exception", () => {
  expect(() => new SuperJSONCodec()).not.toThrow();
});
