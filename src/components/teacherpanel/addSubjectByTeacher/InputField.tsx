import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { CreateClassForm } from "@/types/teacherSubject";

type FieldName = keyof CreateClassForm;

interface InputFieldProps {
  label: string;
  name: FieldName;
  type?: string;
  value: string;
  onChange: (name: FieldName, value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  hint?: string;
  min?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
  icon,
  hint,
  min: minValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const handleChange = (val: string) => {
    if (type === "number") {
      let num = Number(val);
      if (minValue !== undefined && num < minValue) {
        num = minValue;
      }
      onChange(name, num.toString());
    } else {
      onChange(name, val);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          min={type === "number" ? minValue : undefined}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${name}-error` : hint ? `${name}-hint` : undefined
          }
          className={`w-full ${icon ? "pl-10" : "pl-4"} ${
            isPasswordField ? "pr-12" : "pr-4"
          } py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white hover:border-gray-400"
          }`}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
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

export default InputField;
