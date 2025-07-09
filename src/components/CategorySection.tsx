
import { useLanguage } from "@/contexts/LanguageContext";

interface CategorySectionProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
  onShowAll: () => void;
}

const CategorySection = ({ 
  categories, 
  selectedCategory, 
  onCategoryClick, 
  onShowAll 
}: CategorySectionProps) => {
  const { t } = useLanguage();

  // Mapeamento otimizado de categorias para chaves de tradução
  const getCategoryTranslation = (category: string) => {
    switch (category) {
      case 'CASAS':
        return t('categories.houses');
      case 'DECORAÇÕES':
        return t('categories.decorations');
      case 'FAZENDAS':
        return t('categories.farms');
      case 'PACK DE HOLOGRAMA':
        return t('categories.hologramPacks');
      default:
        return category;
    }
  };

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
          >
            {t('categories.showAll')}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryClick(category)}
            className={`px-3 py-1 rounded text-sm font-medium border transition-colors uppercase ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary text-secondary-foreground border-border hover:bg-accent'
            }`}
          >
            {getCategoryTranslation(category)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
