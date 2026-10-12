import { serialize } from "superjson";
import { expect, test } from "vitest";

test("serialize doesn't throw on unsupported types and just passes them as is", () => {
  const obj = {
    request: new Request("https://example.com"),
    fetch,
    response: new Response(),
  };
  expect(serialize(obj)).toStrictEqual({ json: obj });
});

test("functions nested in objects are silently lost after JSON.stringify", () => {
  const { json, meta } = serialize({ a: 1, fn: () => {} });
  expect(json).toHaveProperty("fn"); // still present after serialize
  expect(JSON.parse(JSON.stringify(json))).toStrictEqual({ a: 1 }); // gone after a round trip
  expect(meta).toBeUndefined(); // and nothing in meta records it
});
