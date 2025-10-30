"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  debounceTime = 300,
}) => {
  const [localTerm, setLocalTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => setSearchTerm(localTerm), debounceTime);
    return () => clearTimeout(handler);
  }, [localTerm, setSearchTerm, debounceTime]);

  return (
    <input
      type="text"
      value={localTerm}
      onChange={(e) => setLocalTerm(e.target.value)}
      placeholder="Search by teacher or subject..."
      className="w-full lg:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;
