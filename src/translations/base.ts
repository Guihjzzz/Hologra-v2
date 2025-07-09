
// Estrutura base para todas as traduções - garante consistência
export interface TranslationStructure {
  header: {
    title: string;
    search: string;
  };
  categories: {
    title: string;
    showAll: string;
    houses: string;
    decorations: string;
    farms: string;
    hologramPacks: string;
  };
  results: {
    items: string;
    available: string;
    in: string;
    resultsFor: string;
    noResults: string;
    noResultsDescription: string;
  };
  card: {
    explore: string;
    texture: string;
  };
  footer: {
    title: string;
  };
  languages: {
    pt: string;
    en: string;
    es: string;
  };
  notFound: {
    title: string;
    message: string;
    returnHome: string;
  };
  items: {
    [key: string]: string;
  };
}
