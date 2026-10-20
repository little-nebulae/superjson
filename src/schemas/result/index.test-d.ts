import type { SuperJSONResult } from "superjson";
import type { z } from "zod";

import { expectTypeOf, test } from "vitest";

import type { SuperJSONResultSchema } from "@/schemas/result";

test("SuperJSONResultSchema's inferred type should be equal to SuperJSONResult", () => {
  expectTypeOf<
    z.infer<typeof SuperJSONResultSchema>
  >().toEqualTypeOf<SuperJSONResult>();
});
