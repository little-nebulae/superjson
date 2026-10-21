import { unwrap } from "@little-nebulae/result";
import SuperJSON from "superjson";
import { describe, expect, test } from "vitest";

import { superjsonCreateCodec } from "@/ops/create-codec";

describe("superjsonCreateCodec should succeed", () => {
  const codec = unwrap(superjsonCreateCodec());

  test("at creating an instance of the SuperJSON class", () => {
    expect(codec).toBeInstanceOf(SuperJSON);
  });
});
