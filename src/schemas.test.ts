import { deserialize, serialize } from "superjson";
import { assert, expect, test } from "vitest";

import { SuperJSONResultSchema } from "@/schemas";

// Success case
test("SuperJSONResultSchema should parse the result from serialize for supported types", () => {
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
