
import React, { memo } from 'react';
import SearchBarOptimized from "@/components/SearchBarOptimized";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const HeaderOptimized = memo(({ searchTerm, onSearchChange }: HeaderProps) => {
  const { t } = useLanguage();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start md:mb-6">
          <div className="hidden md:flex md:flex-1"></div>
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-primary">
              {t('header.title')}
            </h1>
          </div>
          <div className="flex justify-center md:justify-end md:flex-1">
            <LanguageSelector />
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mt-4 md:mt-0">
          <SearchBarOptimized 
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            placeholder={t('header.search')}
          />
        </div>
      </div>
    </header>
  );
});

HeaderOptimized.displayName = 'HeaderOptimized';

export default HeaderOptimized;
