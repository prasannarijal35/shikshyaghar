import React from "react";
import { AlertCircle } from "lucide-react";
import { CreateClassForm } from "@/types/teacherSubject";

type FieldName = keyof CreateClassForm;

interface TextAreaProps {
  label: string;
  name: FieldName; // ✅ strongly typed
  value: string;
  onChange: (name: FieldName, value: string) => void; // ✅ consistent with InputField & SelectDropdown
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  hint?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  rows = 4,
  hint,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={
          error ? `${name}-error` : hint ? `${name}-hint` : undefined
        }
        className={`w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
          error ? "border-red-500 bg-red-50" : "bg-white hover:border-gray-400"
        }`}
      />
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-1 text-sm text-gray-500">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600 flex items-center"
        >
          <AlertCircle size={16} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;
