import { JSONSchema } from "../types";

export const formValidator = (schema: JSONSchema) => {
  if (!schema.formTitle) throw new Error("Form title is required.");
  if (!schema.fields || schema.fields.length === 0) throw new Error("Fields are required.");
};
