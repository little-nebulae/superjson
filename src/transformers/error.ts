import { isError } from "@little-nebulae/error";
import { deserializeError, serializeError } from "serialize-error";

import type { CustomTransformer, JSONValue } from "@/types";

export const ERROR_TRANSFORMER_NAME = "serialize-error";

export const errorTransformer = {
  isApplicable: (value) => isError(value),
  serialize: (value) => serializeError(value) as JSONValue,
  deserialize: (value) => deserializeError(value),
} satisfies CustomTransformer<Error, JSONValue>;
