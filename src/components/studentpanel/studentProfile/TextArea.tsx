import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

type FieldName = string;

interface TextAreaProps {
  label: string;
  name: FieldName;
  value: string | number;
  onChange: (name: FieldName, value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  hint?: string;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  rows = 4,
  hint,
  disabled = false,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="group relative">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          required={required}
          rows={rows}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${name}-error` : hint ? `${name}-hint` : undefined
          }
          className={`peer w-full px-4 pt-6 pb-2 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none resize-none ${
            error
              ? "border-red-400 focus:border-red-500 bg-red-50/50"
              : focused || value
              ? "border-blue-500 focus:border-blue-600 bg-white shadow-lg"
              : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
          } ${
            disabled
              ? "bg-gray-50 cursor-not-allowed opacity-60"
              : "hover:shadow-md focus:shadow-lg"
          }`}
        />

        <label
          className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            focused || value
              ? "top-2 text-xs font-semibold text-blue-600"
              : "top-6 text-gray-500"
          } ${error && (focused || value) ? "text-red-500" : ""}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Character count indicator */}
        <div
          className={`absolute bottom-2 right-4 text-xs transition-colors duration-300 ${
            focused ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {value.toString().length}/500
        </div>
      </div>

      {hint && !error && (
        <p
          id={`${name}-hint`}
          className="mt-2 text-sm text-gray-600 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full inline-block"></span>
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${name}-error`}
          className="mt-2 text-sm text-red-600 flex items-center gap-2 animate-in slide-in-from-left-1 duration-300"
        >
          <AlertCircle size={16} />
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;
