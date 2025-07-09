
import React, { memo, useMemo } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultsCounterProps {
  count: number;
  selectedCategory: string;
  searchTerm: string;
}

// Cache estático para traduções de categorias
const CATEGORY_TRANSLATIONS = {
  'CASAS': 'categories.houses',
  'DECORAÇÕES': 'categories.decorations',
  'FAZENDAS': 'categories.farms',
  'PACK DE HOLOGRAMA': 'categories.hologramPacks'
} as const;

const ResultsCounterOptimized = memo(({ count, selectedCategory, searchTerm }: ResultsCounterProps) => {
  const { t } = useLanguage();

  // Memoizar a mensagem para evitar recálculos desnecessários
  const message = useMemo(() => {
    if (selectedCategory) {
      const translationKey = CATEGORY_TRANSLATIONS[selectedCategory as keyof typeof CATEGORY_TRANSLATIONS];
      const categoryTranslation = translationKey ? t(translationKey) : selectedCategory;
      return `${count} ${t('results.items')} ${t('results.in')} "${categoryTranslation}"`;
    }
    if (searchTerm) {
      return `${count} ${t('results.resultsFor')} "${searchTerm}"`;
    }
    return `${count} ${t('results.items')} ${t('results.available')}`;
  }, [count, selectedCategory, searchTerm, t]);

  return (
    <div className="mb-6">
      <div className="bg-card rounded p-3 border">
        <p className="text-muted-foreground text-sm">
          {message}
        </p>
      </div>
    </div>
  );
});

ResultsCounterOptimized.displayName = 'ResultsCounterOptimized';

export default ResultsCounterOptimized;
