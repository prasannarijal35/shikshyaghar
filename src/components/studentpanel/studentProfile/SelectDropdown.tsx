import React, { useState, useEffect, useRef } from "react";
import { AlertCircle, Search, ChevronDown, Check } from "lucide-react";

type FieldName = string;

interface SelectDropdownProps {
  label: string;
  name: FieldName;
  value: string | number;
  onChange: (name: FieldName, value: string) => void;
  options: { value: string | number; label: string }[];
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  hint?: string;
  searchable?: boolean;
  disabled?: boolean;
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
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        const selected = options.find(
          (opt) => opt.value.toString() === value.toString()
        );
        setSearchTerm(selected?.label || "");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [options, value]);

  useEffect(() => {
    const selectedOption = options.find(
      (opt) => opt.value.toString() === value.toString()
    );
    setSearchTerm(selectedOption?.label || "");
  }, [value, options]);

  const selectedOption = options.find(
    (opt) => opt.value.toString() === value.toString()
  );

  return (
    <div className="group relative" ref={wrapperRef}>
      <div className="relative">
        {searchable && !disabled ? (
          <input
            type="text"
            value={searchTerm}
            onFocus={() => {
              setFocused(true);
              setOpen(true);
            }}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpen(true);
            }}
            placeholder=" "
            className={`peer w-full ${
              icon ? "pl-12" : "pl-4"
            } pr-12 pt-6 pb-2 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
              error
                ? "border-red-400 focus:border-red-500 bg-red-50/50"
                : focused || value
                ? "border-blue-500 focus:border-blue-600 bg-white shadow-lg"
                : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
            } ${
              disabled
                ? "bg-gray-50 cursor-not-allowed opacity-60"
                : "hover:shadow-md focus:shadow-lg cursor-pointer"
            }`}
            disabled={disabled}
          />
        ) : (
          <div
            onClick={() => !disabled && setOpen(!open)}
            className={`peer w-full ${
              icon ? "pl-12" : "pl-4"
            } pr-12 pt-6 pb-2 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none cursor-pointer ${
              error
                ? "border-red-400 focus:border-red-500 bg-red-50/50"
                : open || value
                ? "border-blue-500 focus:border-blue-600 bg-white shadow-lg"
                : "border-gray-200 hover:border-gray-300"
            } ${
              disabled
                ? "bg-gray-50 cursor-not-allowed opacity-60"
                : "hover:shadow-md"
            }`}
          >
            <span className={`${value ? "text-gray-900" : "text-gray-500"}`}>
              {selectedOption?.label || ""}
            </span>
          </div>
        )}

        <label
          className={`absolute transition-all duration-300 pointer-events-none ${
            icon ? "left-12" : "left-4"
          } ${
            focused || open || value
              ? "top-2 text-xs font-semibold text-blue-600"
              : "top-1/2 -translate-y-1/2 text-gray-500"
          } ${error && (focused || open || value) ? "text-red-500" : ""}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {icon && (
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              focused || open || value ? "text-blue-500" : "text-gray-400"
            } ${error ? "text-red-500" : ""}`}
          >
            {icon}
          </div>
        )}

        <ChevronDown
          size={20}
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
            open ? "rotate-180 text-blue-500" : "text-gray-400"
          }`}
        />
      </div>

      {open && (
        <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-sm border-2 border-blue-200 rounded-xl shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-h-64 overflow-y-auto py-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(name, opt.value.toString());
                    setOpen(false);
                  }}
                  className={`group/item flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200 mx-2 rounded-lg ${
                    value.toString() === opt.value.toString()
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                  {value.toString() === opt.value.toString() && (
                    <Check size={16} className="text-white" />
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500">
                <Search size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No options found</p>
              </div>
            )}
          </div>
        </div>
      )}

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

export default SelectDropdown;
