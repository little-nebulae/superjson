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
