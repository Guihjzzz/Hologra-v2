
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultsCounterProps {
  count: number;
  selectedCategory: string;
  searchTerm: string;
}

const ResultsCounter = ({ count, selectedCategory, searchTerm }: ResultsCounterProps) => {
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

  const getMessage = () => {
    if (selectedCategory) {
      return `${count} ${t('results.items')} ${t('results.in')} "${getCategoryTranslation(selectedCategory)}"`;
    }
    if (searchTerm) {
      return `${count} ${t('results.resultsFor')} "${searchTerm}"`;
    }
    return `${count} ${t('results.items')} ${t('results.available')}`;
  };

  return (
    <div className="mb-6">
      <div className="bg-card rounded p-3 border">
        <p className="text-muted-foreground text-sm">
          {getMessage()}
        </p>
      </div>
    </div>
  );
};

export default ResultsCounter;
