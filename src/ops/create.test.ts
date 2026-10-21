import { unwrap } from "@little-nebulae/result";
import SuperJSON from "superjson";
import { expect, test } from "vitest";

import { superjsonCreateCodec } from "@/ops/create";

test("superjsonCreateCodec should be an instance of the SuperJSON class", () => {
  const codec = unwrap(superjsonCreateCodec());
  expect(codec).toBeInstanceOf(SuperJSON);
});
