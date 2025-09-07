// components/FileUploadField.tsx
"use client";

import React, { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import Image from "next/image";

interface FileUploadFieldProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  accept: string;
  hint?: string;
  preview?: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  name,
  onChange,
  error,
  required = false,
  accept,
  hint,
  preview,
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div className="mb-4">
      {/* Top field label (not clickable) */}
      <span className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>

      {/* File upload area (clickable) */}
      <label
        htmlFor={name}
        className={`cursor-pointer border-2 border-dashed rounded-lg p-6 text-center transition-colors block ${
          dragOver
            ? "border-blue-400 bg-blue-50"
            : error
            ? "border-red-300 bg-red-50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />

        {/* Hidden file input */}
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          required={required}
          className="hidden"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${name}-error` : hint ? `${name}-hint` : undefined
          }
        />

        <p className="text-blue-600 hover:text-blue-500 font-medium">
          Click to upload or drag and drop
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {accept.includes("image") ? "PNG, JPG up to 5MB" : "PDF up to 10MB"}
        </p>
      </label>

      {/* Preview */}
      {preview && (
        <div className="mt-3">
          <Image
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
          />
        </div>
      )}

      {/* Hint */}
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-1 text-sm text-gray-500">
          {hint}
        </p>
      )}

      {/* Error */}
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

export default FileUploadField;
