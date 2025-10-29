import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

type FieldName = string;

interface InputFieldProps {
  label: string;
  name: FieldName;
  type?: string;
  value: string | number;
  onChange: (name: FieldName, value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  hint?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  icon,
  hint,
  min: minValue,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const handleChange = (val: string) => {
    if (type === "number") {
      let num = Number(val);
      if (minValue !== undefined && num < minValue) num = minValue;
      onChange(name, num.toString());
    } else {
      onChange(name, val);
    }
  };

  return (
    <div className="group relative">
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          required={required}
          min={type === "number" ? minValue : undefined}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${name}-error` : hint ? `${name}-hint` : undefined
          }
          className={`peer w-full ${icon ? "pl-12" : "pl-4"} ${
            isPasswordField ? "pr-12" : "pr-4"
          } pt-6 pb-2 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
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
            icon ? "left-12" : "left-4"
          } ${
            focused || value
              ? "top-2 text-xs font-semibold text-blue-600"
              : "top-1/2 -translate-y-1/2 text-gray-500"
          } ${error && (focused || value) ? "text-red-500" : ""}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {icon && (
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              focused || value ? "text-blue-500" : "text-gray-400"
            } ${error ? "text-red-500" : ""}`}
          >
            {icon}
          </div>
        )}

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200 p-1 rounded-lg hover:bg-blue-50"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
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

export default InputField;
