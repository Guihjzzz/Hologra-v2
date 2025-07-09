
import React, { memo, useCallback } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface CategorySectionProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
  onShowAll: () => void;
}

// Cache estático para traduções de categorias
const CATEGORY_TRANSLATIONS = {
  'CASAS': 'categories.houses',
  'DECORAÇÕES': 'categories.decorations', 
  'FAZENDAS': 'categories.farms',
  'PACK DE HOLOGRAMA': 'categories.hologramPacks'
} as const;

const CategorySectionOptimized = memo(({ 
  categories, 
  selectedCategory, 
  onCategoryClick, 
  onShowAll 
}: CategorySectionProps) => {
  const { t } = useLanguage();

  // Mapeamento otimizado de categorias
  const getCategoryTranslation = useCallback((category: string) => {
    const translationKey = CATEGORY_TRANSLATIONS[category as keyof typeof CATEGORY_TRANSLATIONS];
    return translationKey ? t(translationKey) : category;
  }, [t]);

  const handleCategoryClick = useCallback((category: string) => {
    onCategoryClick(category);
  }, [onCategoryClick]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          {t('categories.title')}
        </h2>
        {selectedCategory && (
          <button
            onClick={onShowAll}
            className="text-sm text-primary hover:underline"
            type="button"
          >
            {t('categories.showAll')}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-3 py-1 rounded text-sm font-medium border transition-colors uppercase ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary text-secondary-foreground border-border hover:bg-accent'
            }`}
            type="button"
          >
            {getCategoryTranslation(category)}
          </button>
        ))}
      </div>
    </div>
  );
});

CategorySectionOptimized.displayName = 'CategorySectionOptimized';

export default CategorySectionOptimized;
