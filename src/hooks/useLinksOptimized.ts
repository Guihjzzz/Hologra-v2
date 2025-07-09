
import { useState, useMemo, useCallback } from 'react';
import { housesData } from '@/data/houses';
import { decorationsData } from '@/data/decorations';
import { farmsData } from '@/data/farms';
import { hologramPacksData } from '@/data/hologramPacks';
import { useDebounce } from '@/hooks/useDebounce';

export interface LinkItemTranslations {
  pt: {
    title: string;
    description: string;
  };
  en: {
    title: string;
    description: string;
  };
  es: {
    title: string;
    description: string;
  };
}

export interface LinkItem {
  id: string;
  url: string;
  mcstructureUrl?: string;
  category: string;
  imageUrl?: string;
  translations: LinkItemTranslations;
  title?: string;
  description?: string;
}

// Cache estático dos dados combinados para evitar recriação
const ALL_LINKS_CACHE: LinkItem[] = [
  ...housesData,
  ...decorationsData,
  ...farmsData,
  ...hologramPacksData
];

// Cache de categorias únicas
const CATEGORIES_CACHE = Array.from(new Set(ALL_LINKS_CACHE.map(link => link.category))).sort();

const useLinksOptimized = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Debounce do termo de busca para reduzir renderizações
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Função de filtragem otimizada com memoização
  const filteredLinks = useMemo(() => {
    let filtered = ALL_LINKS_CACHE;

    // Filtro por categoria (mais rápido primeiro)
    if (selectedCategory) {
      filtered = filtered.filter(link => link.category === selectedCategory);
    }

    // Filtro por busca com termo debounced
    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      
      filtered = filtered.filter(link => {
        // Busca otimizada com short-circuit evaluation
        if (link.category.toLowerCase().includes(searchLower)) return true;
        
        if (link.translations) {
          // Usar for...in para melhor performance
          for (const lang in link.translations) {
            const translation = link.translations[lang as keyof LinkItemTranslations];
            if (translation.title.toLowerCase().includes(searchLower) ||
                translation.description.toLowerCase().includes(searchLower)) {
              return true;
            }
          }
          return false;
        }
        
        // Fallback para formato legado
        return (link.title?.toLowerCase().includes(searchLower) ||
                link.description?.toLowerCase().includes(searchLower)) ?? false;
      });
    }

    return filtered;
  }, [debouncedSearchTerm, selectedCategory]);

  // Callback otimizado para mudança de busca
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Callback otimizado para mudança de categoria
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return {
    links: filteredLinks,
    allLinks: ALL_LINKS_CACHE,
    categories: CATEGORIES_CACHE,
    searchTerm,
    setSearchTerm: handleSearchChange,
    selectedCategory,
    setSelectedCategory: handleCategoryChange
  };
};

export default useLinksOptimized;
