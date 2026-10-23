import { UNEXPECTED_ERROR_CODE, UnexpectedError } from "@little-nebulae/error";
import { unwrap } from "@little-nebulae/result";
import {
  sc2BigIntTypedArrays,
  sc2Match,
  sc2NestedCustomError,
  sc2NestedError,
  sc2Replay,
  sc2Unsupported,
} from "test/fixtures";
import { assert, describe, expect, test } from "vitest";

import { SuperJSONCodec } from "@/codec";
import { DetailedSuperJSONResultSchema } from "@/schemas/result";

// Constructor
test("SuperJSONCodec's constructor should not throw any exception", () => {
  expect(() => new SuperJSONCodec()).not.toThrow();
});

const codec = new SuperJSONCodec();

// encode-decode methods
describe("SuperJSONCodec's encode-decode methods should", () => {
  // Success cases
  describe("succeed", () => {
    test("at handling data types supported by JSON.stringify", () => {
      const fixture = sc2Match;

      const output = unwrap(codec.encode({ input: fixture }));
      expect(output).toStrictEqual({ json: fixture });

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });

    test("at handling additional data types that are not supported by JSON.stringify but supported by superjson (this test doesn't cover error)", () => {
      const fixture = sc2Replay;

      const output = unwrap(codec.encode({ input: fixture }));
      expect(output.meta).toBeDefined();

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });

    test("at handling nested error", () => {
      const fixture = sc2NestedError;

      const output = unwrap(codec.encode({ input: fixture }));
      expect(output.meta).toBeDefined();

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });

    test("at handling bigint typed arrays", () => {
      const fixture = sc2BigIntTypedArrays;

      const output = unwrap(codec.encode({ input: fixture }));
      expect(output.meta).toBeDefined();

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });
  });

  // Edge case
  test("succeed at handling nested custom error but the result will be lossy", () => {
    const fixture = sc2NestedCustomError;

    const output = unwrap(codec.encode({ input: fixture }));
    expect(output.meta).toBeDefined();

    expect(() => JSON.stringify(output)).not.toThrow();

    const input = unwrap(codec.decode({ output }));
    // Expect input to not be an instance of UnexpectedError like the fixture
    expect(input).not.toBeInstanceOf(UnexpectedError);
    expect(fixture).toBeInstanceOf(UnexpectedError);
    // but input is still an instance of Error
    expect(input).toBeInstanceOf(Error);
    // and it can still be identified by code
    expect(input.code).toBe(UNEXPECTED_ERROR_CODE);

    // Expect input to not strictly equal to fixture
    expect(input).not.toStrictEqual(fixture);
    // because input's name isn't enumerable but fixture's is
    const mismatchedProperty = "name";
    expect(
      Object.getOwnPropertyDescriptor(input, mismatchedProperty)?.enumerable,
    ).toBe(false);
    expect(
      Object.getOwnPropertyDescriptor(fixture, mismatchedProperty)?.enumerable,
    ).toBe(true);

    expect({
      name: input.name,
      message: input.message,
      cause: input.cause,
      stack: input.stack,
      code: input.code,
      meta: input.meta,
    }).toStrictEqual({
      name: fixture.name,
      message: fixture.message,
      cause: fixture.cause,
      stack: fixture.stack,
      code: fixture.code,
      meta: fixture.meta,
    });
  });
});

// encodeUnknown method
describe("SuperJSONCodec's encodeUnknown method should", () => {
  // JSON-safe cases
  describe("return a json-safe result when", () => {
    test("handling data types supported by JSON.stringify", () => {
      const fixture = sc2Match;

      const detailedResult = unwrap(codec.encodeUnknown({ input: fixture }));
      assert(detailedResult.jsonSafe);

      const output = detailedResult.output;
      expect(output).toStrictEqual({ json: fixture });

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });

    test("handling additional data types that are not supported by JSON.stringify but supported by superjson (this test doesn't cover error)", () => {
      const fixture = sc2Replay;

      const detailedResult = unwrap(codec.encodeUnknown({ input: fixture }));
      assert(detailedResult.jsonSafe);

      const output = detailedResult.output;
      expect(output.meta).toBeDefined();

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });

    test("handling nested error", () => {
      const fixture = sc2NestedError;

      const detailedResult = unwrap(codec.encodeUnknown({ input: fixture }));
      assert(detailedResult.jsonSafe);

      const output = detailedResult.output;
      expect(output.meta).toBeDefined();

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });

    test("handling bigint typed arrays", () => {
      const fixture = sc2BigIntTypedArrays;

      const detailedResult = unwrap(codec.encodeUnknown({ input: fixture }));
      assert(detailedResult.jsonSafe);

      const output = detailedResult.output;
      expect(output.meta).toBeDefined();

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);
    });
  });

  // Non-JSON-safe cases
  describe("return a non-json-safe result when", () => {
    test("handling unsupported data types", () => {
      const fixture = sc2Unsupported;

      const detailedResult = unwrap(codec.encodeUnknown({ input: fixture }));
      expect(detailedResult).toStrictEqual(
        DetailedSuperJSONResultSchema<typeof fixture>().parse(detailedResult),
      );
      assert(detailedResult.jsonSafe === false);

      const { output, issues } = detailedResult;

      // Testing output
      expect(output).toStrictEqual({ json: fixture });

      expect(() => JSON.stringify(output)).not.toThrow();

      const input = unwrap(codec.decode({ output }));
      expect(input).toStrictEqual(fixture);

      // Testing issues
      const stringifiedIssues = JSON.stringify(issues);
      const parsedIssues = JSON.parse(stringifiedIssues);
      expect(issues).toStrictEqual(parsedIssues);

      assert(issues.format === "raw");
      expect(issues.value).toHaveLength(1);

      const [issue] = issues.value;
      assert(issue);
      assert(issue.code === "invalid_union");
      expect(issue.errors).toHaveLength(6);
    });
  });
});
