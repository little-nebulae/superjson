import { unwrap } from "@little-nebulae/result";
import { sc2Match } from "test/fixtures";
import { assert, describe, expect, test } from "vitest";

import { superjsonCreateCodec } from "@/ops/create-codec";
import { superjsonEncodeWithDiagnostics } from "@/ops/encode/with-diagnostics";

const codec = unwrap(superjsonCreateCodec());

// Success cases
describe("superjsonEncodeWithDiagnostics should succeed", () => {
  test("at losslessly encoding data types that are supported by JSON.stringify", () => {
    const result = unwrap(
      superjsonEncodeWithDiagnostics({ input: sc2Match, codec }),
    );
    assert(result.lossy === false);
    expect(result.output.json).toStrictEqual(sc2Match);
    expect(result.output.meta).toBeUndefined();
  });
});
