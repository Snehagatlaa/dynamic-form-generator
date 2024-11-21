export interface FormField {
  id: string;
  type: "text" | "email" | "textarea" | "select" | "radio";
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required: boolean;
  validation?: {
  message: string;
  pattern?: string; }
}

export interface JSONSchema {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}
