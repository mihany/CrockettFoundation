import type { SchemaTypeDefinition } from "sanity";
import { eventType } from "./event";
import { programType } from "./program";

export const schemaTypes: SchemaTypeDefinition[] = [eventType, programType];
