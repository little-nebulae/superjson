import { deserialize, serialize } from "superjson";
import { expect, test } from "vitest";

test("deserialize doesn't throw on unsupported types", () => {
  const obj = {
    request: new Request("https://example.com"),
    fetch,
    response: new Response(),
  };
  expect(deserialize(serialize(obj))).toStrictEqual(obj);
});
