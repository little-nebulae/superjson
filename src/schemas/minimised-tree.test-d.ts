import type { SuperJSONResult } from "superjson";
import type { z } from "zod";

import { expectTypeOf, test } from "vitest";

import type { MinimisedTypeAnnotationTreeSchema } from "@/schemas/minimised-tree";

test("MinimisedTypeAnnotationTreeSchema's inferred type should be equal to the type of SuperJSONResult's meta.values property", () => {
  type Actual = z.infer<typeof MinimisedTypeAnnotationTreeSchema>;
  type Expected = Required<Required<SuperJSONResult>["meta"]>["values"];
  expectTypeOf<Actual>().toEqualTypeOf<Expected>();
});
