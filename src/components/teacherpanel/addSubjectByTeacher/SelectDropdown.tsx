import React, { useState, useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { CreateClassForm } from "@/types/teacherSubject";

type FieldName = keyof CreateClassForm;

interface SelectDropdownProps {
  label: string;
  name: FieldName;
  value: string;
  onChange: (name: FieldName, value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  hint?: string;
  searchable?: boolean;
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
  searchable = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter options based on searchTerm
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchTerm(
          filteredOptions.find((opt) => opt.value === value)?.label || ""
        );
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filteredOptions, value]);

  // Reset searchTerm if value changes externally
  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    setSearchTerm(selectedOption?.label || "");
  }, [value, options]);

  return (
    <div className="mb-4 relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {searchable ? (
        <>
          <input
            type="text"
            value={searchTerm}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpen(true);
            }}
            placeholder={`Search ${label}`}
            className={`w-full ${
              icon ? "pl-10" : "pl-4"
            } pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              error
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          />
          {open && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-md">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => {
                      onChange(name, opt.value);
                      setOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                      value === opt.value ? "bg-blue-50 font-semibold" : ""
                    }`}
                  >
                    {opt.label}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No options found</li>
              )}
            </ul>
          )}
        </>
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${name}-error` : hint ? `${name}-hint` : undefined
          }
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white hover:border-gray-400"
          }`}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

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
