
import React, { memo, useCallback } from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const SearchBarOptimized = memo(({ searchTerm, onSearchChange, placeholder = "Pesquisar..." }: SearchBarProps) => {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  return (
    <div className="relative w-full max-w-xl mx-auto mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="pl-10 h-10"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
});

SearchBarOptimized.displayName = 'SearchBarOptimized';

export default SearchBarOptimized;
