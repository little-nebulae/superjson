import { z } from "zod";

import { TypeAnnotationSchema } from "@/schemas/result/meta/values/type-annotation";

type Leaf<T> = [T];
type InnerNode<T> = [T, Record<string, Tree<T>>];
type Tree<T> = InnerNode<T> | Leaf<T>;

const TypeAnnotationTreeSchema: z.ZodType<
  Tree<z.infer<typeof TypeAnnotationSchema>>
> = z.lazy(() =>
  z.union([
    z.tuple([TypeAnnotationSchema]), // Leaf
    z.tuple([
      TypeAnnotationSchema,
      z.record(z.string(), TypeAnnotationTreeSchema),
    ]), // InnerNode
  ]),
);

export const MinimisedTypeAnnotationTreeSchema = z
  .union([
    TypeAnnotationTreeSchema,
    z.record(z.string(), TypeAnnotationTreeSchema),
  ])
  .optional();
