import { deserialize, serialize } from "superjson";
import { assert, describe, expect, test } from "vitest";

import { SuperJSONResultSchema } from "@/schemas/result";

// Success cases
describe("SuperJSONResultSchema should succeed", () => {
  test("when it parses the result from serialize for supported types", () => {
    const object = {
      normal: "string",
      timestamp: new Date(),
      test: /superjson/,
    };
    const serializeResult = serialize(object);
    const parseResult = SuperJSONResultSchema.safeParse(serializeResult);

    assert(parseResult.success);
    expect(deserialize(parseResult.data)).toStrictEqual(object);
  });

  test("even when it parses the result from serialize for unsupported types", () => {
    const object = {
      request: new Request("https://example.com"),
      fetch,
      response: new Response(),
    };
    const serializeResult = serialize(object);
    const parseResult = SuperJSONResultSchema.safeParse(serializeResult);

    assert(parseResult.success);
    expect(deserialize(parseResult.data)).toStrictEqual(object);
  });
});
