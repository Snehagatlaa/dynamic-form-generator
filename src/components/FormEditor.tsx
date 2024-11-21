import React, { useState } from "react";
import { JSONSchema } from "../types"; // Import types
import { formValidator } from "../utils/formvalidator"; // Assuming this function validates the schema

interface FormEditorProps {
  schema: JSONSchema; // The schema passed to the editor
  onChange: (updatedSchema: JSONSchema) => void; // Callback to send the updated schema back to parent
}

const FormEditor: React.FC<FormEditorProps> = ({ schema, onChange }) => {
  const [error, setError] = useState<string | null>(null); // State to track JSON validation errors

  // Handle change in JSON schema textarea
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      // Parse the updated JSON string
      const updatedSchema = JSON.parse(event.target.value);

      // Validate the updated schema
      formValidator(updatedSchema); // Assuming you have a schema validator function

      // If valid, update the parent component's schema
      onChange(updatedSchema); 

      setError(null); // Clear the error if valid
    } catch (e) {
      // Set error if JSON is invalid
      setError("Invalid JSON format");
    }
  };

  // Copy JSON schema to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    alert("JSON schema copied to clipboard!"); // Notify the user
  };

  return (
    <div className="flex flex-col w-full p-4">
      <h2 className="text-2xl font-bold">Edit JSON Schema</h2>
      
      {/* Textarea to edit the schema */}
      <textarea
        className="border p-2 mt-2"
        rows={10}
        value={JSON.stringify(schema, null, 2)} // Stringify the schema for editing
        onChange={handleChange} // Call handleChange on text change
      />
      
      {/* Button to copy the JSON schema to clipboard */}
      <button 
        onClick={copyToClipboard} 
        className="bg-gray-300 text-black mt-4 p-2 rounded"
      >
        Copy Form JSON
      </button>
      
      {/* Show validation error message */}
      {error && <div className="text-red-500 mt-2">{error}</div>}
      
      {/* Validation details for each field */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg">Field Validation</h3>
        {schema.fields.map((field) => (
          <div key={field.id} className="mt-2">
            <p><strong>{field.label}:</strong></p>
            
            {/* Show "Required" validation */}
            {field.required && <p>Required: Yes</p>}

            {/* Show validation message if available */}
            {field.validation?.message && (
              <p>Validation Message: {field.validation.message}</p>
            )}

            {/* Show validation pattern if available */}
            {field.validation?.pattern && (
              <p>Validation Pattern: {field.validation.pattern}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormEditor;
