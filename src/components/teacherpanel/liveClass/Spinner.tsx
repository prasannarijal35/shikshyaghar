"use client";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function Spinner({
  size = "md",
  text = "Loading...",
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`animate-spin rounded-full border-b-2 border-indigo-600 ${sizeClasses[size]}`}
      ></div>
      {text && <span className="ml-2 text-gray-600">{text}</span>}
    </div>
  );
}
