import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { JSONSchema, FormField } from "../types";
import FormFieldComponent from "./FormField";

interface FormPreviewProps {
  schema: JSONSchema;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
    
    // Download form submission as JSON
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form_submission.json";
    link.click();
  };

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-2xl font-bold">{schema.formTitle}</h2>
      <p className="text-gray-600">{schema.formDescription}</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {schema.fields.map((field: FormField) => (
          <FormFieldComponent
            key={field.id}
            field={field}
            register={register}
            errors={errors}
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;
