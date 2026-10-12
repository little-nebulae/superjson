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

// Failure case
test("SuperJSONResultSchema shouldn't parse the result from serialize for unsupported types", () => {
  const object = {
    request: new Request("https://example.com"),
    fetch,
    response: new Response(),
  };
  const serializeResult = serialize(object);
  const parseResult = SuperJSONResultSchema.safeParse(serializeResult);

  assert(parseResult.success === false);
  const issues = parseResult.error.issues;
  expect(issues).toHaveLength(1);
  const issue = issues[0];
  assert(issue);
  assert(issue.code === "invalid_union");
  expect(issue.path).toStrictEqual(["json"]);
});
