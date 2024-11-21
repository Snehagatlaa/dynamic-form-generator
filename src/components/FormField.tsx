import React from "react";
import { FieldValues, UseFormRegister, FieldError, FieldErrors } from "react-hook-form";
import { FormField } from "../types";

interface FormFieldProps {
  field: FormField;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const FormFieldComponent: React.FC<FormFieldProps> = ({ field, register, errors }) => {
  const fieldError = errors[field.id] as FieldError | undefined;

  switch (field.type) {
    case "text":
    case "email":
    case "textarea":
      return (
        <div className="flex flex-col">
          <label className="font-semibold">{field.label}</label>
          <input
            type={field.type}
            {...register(field.id, { required: field.required })}
            className="border p-2 mt-1"
            placeholder={field.placeholder}
          />
          {fieldError && (
            <span className="text-red-500">{field.validation?.message || "This field is required"}</span>
          )}
        </div>
      );
    case "select":
      return (
        <div className="flex flex-col">
          <label className="font-semibold">{field.label}</label>
          <select {...register(field.id, { required: field.required })} className="border p-2 mt-1">
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldError && (
            <span className="text-red-500">{field.validation?.message || "This field is required"}</span>
          )}
        </div>
      );
    case "radio":
      return (
        <div className="flex flex-col">
          <label className="font-semibold">{field.label}</label>
          {field.options?.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                value={option.value}
                {...register(field.id, { required: field.required })}
                className="mr-2"
              />
              <label>{option.label}</label>
            </div>
          ))}
          {fieldError && (
            <span className="text-red-500">{field.validation?.message || "This field is required"}</span>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default FormFieldComponent;
