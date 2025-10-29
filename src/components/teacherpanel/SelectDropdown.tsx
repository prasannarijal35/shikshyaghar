// components/SelectDropdown.tsx
import React from "react";
import { AlertCircle } from "lucide-react";

interface SelectDropdownProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  hint?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  icon,
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
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${name}-error` : hint ? `${name}-hint` : undefined
          }
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            error
              ? "border-red-500 bg-red-50"
              : "bg-white hover:border-gray-400"
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

export default SelectDropdown;
