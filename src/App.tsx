import React, { useState } from "react";
import FormEditor from "./components/FormEditor";
import FormPreview from "./components/FormPreview";
import { useFormGenerator } from "./hooks/useFormGenerator";
import { sampleSchema } from "./utils/sampleSchema";

const App: React.FC = () => {
  const { schema, updateSchema } = useFormGenerator();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen">
        <button
          onClick={toggleDarkMode}
          className="p-2 m-4 rounded bg-gray-600 text-white"
        >
          Toggle Dark Mode
        </button>
        <div className="flex flex-col md:flex-row">
          <FormEditor schema={schema || sampleSchema} onChange={updateSchema} />
          <FormPreview schema={schema || sampleSchema} />
        </div>
      </div>
    </div>
  );
};

export default App;
