import type { SuperJSONResult } from "superjson";

import { expectTypeOf, test } from "vitest";

import type { ReferentialEqualityAnnotations } from "@/schemas/referential-equality-annotations";

test("ReferentialEqualityAnnotationsSchema's inferred type should be equal to the type of SuperJSONResult's meta.referentialEqualities property", () => {
  expectTypeOf<ReferentialEqualityAnnotations>().toEqualTypeOf<
    Required<Required<SuperJSONResult>["meta"]>["referentialEqualities"]
  >();
});
