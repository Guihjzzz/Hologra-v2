
import { useState, useMemo } from 'react';
import { housesData } from '@/data/houses';
import { decorationsData } from '@/data/decorations';
import { farmsData } from '@/data/farms';
import { hologramPacksData } from '@/data/hologramPacks';

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
  mcstructureUrl?: string; // NOVO CAMPO: Link opcional para o botão "Mcstructure"
  category: string;
  imageUrl?: string;
  translations: LinkItemTranslations;
  // Legacy properties for backward compatibility
  title?: string;
  description?: string;
}

const useLinks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Combinar todos os dados de diferentes categorias
  const allLinks: LinkItem[] = useMemo(() => [
    ...housesData,
    ...decorationsData,
    ...farmsData,
    ...hologramPacksData
  ], []);

  const filteredLinks = useMemo(() => {
    let filtered = allLinks;

    // Filtrar por categoria selecionada
    if (selectedCategory) {
      filtered = filtered.filter(link => link.category === selectedCategory);
    }

    // Filtrar por termo de busca (buscar em todas as traduções)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(link => {
        // Se tem traduções, buscar nelas
        if (link.translations) {
          return Object.values(link.translations).some(translation =>
            translation.title.toLowerCase().includes(searchLower) ||
            translation.description.toLowerCase().includes(searchLower)
          ) || link.category.toLowerCase().includes(searchLower);
        }
        // Fallback para formato legado
        return (link.title?.toLowerCase().includes(searchLower) ||
                link.description?.toLowerCase().includes(searchLower) ||
                link.category.toLowerCase().includes(searchLower)) ?? false;
      });
    }

    return filtered;
  }, [searchTerm, selectedCategory, allLinks]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allLinks.map(link => link.category)));
    return uniqueCategories.sort();
  }, [allLinks]);

  return {
    links: filteredLinks,
    allLinks,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
  };
};

export default useLinks;
