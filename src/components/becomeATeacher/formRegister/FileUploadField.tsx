"use client";

import React, { useState, useEffect } from "react";
import { Upload, AlertCircle, File as FileIcon } from "lucide-react";
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
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string }>();
  const [filePreview, setFilePreview] = useState<string | null>(
    preview || null
  );

  useEffect(() => {
    if (preview) setFilePreview(preview);
  }, [preview]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file: File | null) => {
    onChange(file);
    if (file) {
      setFileInfo({ name: file.name, size: formatFileSize(file.size) });
      const url = URL.createObjectURL(file);
      setFilePreview(url);
    } else {
      setFileInfo(undefined);
      setFilePreview(null);
    }
  };

  return (
    <div className="mb-4">
      {/* Label */}
      <span className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>

      {/* Upload area */}
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
      {filePreview && (
        <div className="mt-3">
          {accept.includes("image") ? (
            <Image
              src={filePreview}
              alt="Preview"
              width={128}
              height={128}
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
          ) : (
            <iframe
              src={filePreview}
              className="w-full h-64 border rounded-lg"
              title="PDF Preview"
            />
          )}
        </div>
      )}

      {/* File info */}
      {fileInfo && (
        <div className="mt-2 flex items-center text-sm text-gray-700">
          <FileIcon className="w-4 h-4 mr-2 text-gray-500" />
          <span className="truncate max-w-[200px]">{fileInfo.name}</span>
          <span className="ml-2 text-gray-500">({fileInfo.size})</span>
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
