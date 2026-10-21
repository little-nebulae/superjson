import type { Options } from "serialize-error";

import { isError } from "@little-nebulae/error";
import { deserializeError, serializeError } from "serialize-error";

import type { CustomTransformer, JSONValue } from "@/types";

const options = { maxDepth: 100, useToJSON: true } satisfies Options;

export const errorTransformer = {
  isApplicable: (value) => isError(value),
  serialize: (value) => serializeError(value, options) as JSONValue,
  deserialize: (value) => deserializeError(value, options),
} satisfies CustomTransformer<Error, JSONValue>;

export const ERROR_TRANSFORMER_NAME = "serialize-error";
