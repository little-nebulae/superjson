import { z } from "zod";

const TypedArrayAnnotationSchema = z.tuple([
  z.literal("typed-array"),
  z.string(),
]);
const ClassTypeAnnotationSchema = z.tuple([z.literal("class"), z.string()]);
const SymbolTypeAnnotationSchema = z.tuple([z.literal("symbol"), z.string()]);
const CustomTypeAnnotationSchema = z.tuple([z.literal("custom"), z.string()]);

const SimpleTypeAnnotationSchema = z.enum([
  "number",
  "undefined",
  "bigint",
  "regexp",
  "Date",
  "URL",
  "map",
  "set",
  "Error",
]);

const CompositeTypeAnnotationSchema = z.union([
  TypedArrayAnnotationSchema,
  ClassTypeAnnotationSchema,
  SymbolTypeAnnotationSchema,
  CustomTypeAnnotationSchema,
]);

export const TypeAnnotationSchema = z.union([
  SimpleTypeAnnotationSchema,
  CompositeTypeAnnotationSchema,
]);
