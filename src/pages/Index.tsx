
import React, { useCallback } from 'react';
import AnimatedBackground from "@/components/AnimatedBackground";
import HeaderOptimized from "@/components/HeaderOptimized";
import CategorySectionOptimized from "@/components/CategorySectionOptimized";
import ResultsCounterOptimized from "@/components/ResultsCounterOptimized";
import LinksGridOptimized from "@/components/LinksGridOptimized";
import Footer from "@/components/Footer";
import useLinksOptimized from "@/hooks/useLinksOptimized";

const Index = () => {
  const { links, searchTerm, setSearchTerm, categories, selectedCategory, setSelectedCategory } = useLinksOptimized();

  const handleCategoryClick = useCallback((category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  }, [selectedCategory, setSelectedCategory]);

  const handleShowAll = useCallback(() => {
    setSelectedCategory('');
    setSearchTerm('');
  }, [setSelectedCategory, setSearchTerm]);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <HeaderOptimized 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="container mx-auto px-4 py-8 md:py-12">
          <CategorySectionOptimized
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            onShowAll={handleShowAll}
          />

          <ResultsCounterOptimized
            count={links.length}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
          />

          <LinksGridOptimized links={links} />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
