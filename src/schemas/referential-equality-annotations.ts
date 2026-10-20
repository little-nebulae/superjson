import { z } from "zod";

export const ReferentialEqualityAnnotationsSchema = z.union([
  z.record(z.string(), z.array(z.string())),
  z.tuple([z.array(z.string())]),
  z.tuple([z.array(z.string()), z.record(z.string(), z.array(z.string()))]),
]);
export type ReferentialEqualityAnnotations = z.infer<
  typeof ReferentialEqualityAnnotationsSchema
>;
