import { unwrap } from "@little-nebulae/result";
import SuperJSON from "superjson";
import { describe, expect, test } from "vitest";

import { superjsonCreateCodec } from "@/ops/create-codec";
import { ERROR_TRANSFORMER_NAME, errorTransformer } from "@/transformers/error";

describe("superjsonCreateCodec should succeed", () => {
  const codec = unwrap(superjsonCreateCodec());

  test("at creating an instance of the SuperJSON class", () => {
    expect(codec).toBeInstanceOf(SuperJSON);
  });

  test("at creating a SuperJSON instance with a custom error transformer", () => {
    expect(
      codec.customTransformerRegistry.findByName(ERROR_TRANSFORMER_NAME),
    ).toStrictEqual({ ...errorTransformer, name: ERROR_TRANSFORMER_NAME });
  });
});
