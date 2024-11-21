import { useState } from "react";
import { JSONSchema } from "../types";

export const useFormGenerator = () => {
  const [schema, setSchema] = useState<JSONSchema | null>(null);

  const updateSchema = (newSchema: JSONSchema) => {
    setSchema(newSchema);
  };

  return { schema, updateSchema };
};