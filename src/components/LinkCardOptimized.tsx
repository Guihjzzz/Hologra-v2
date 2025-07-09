
import React, { memo, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LinkItem } from "@/hooks/useLinksOptimized";

interface LinkCardProps {
  item: LinkItem;
}

const LinkCardOptimized = memo(({ item }: LinkCardProps) => {
  const { t, currentLanguage } = useLanguage();
  
  // Callback memoizado para abrir URLs
  const handleClick = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Callback memoizado para clique no card
  const handleCardClick = useCallback(() => {
    handleClick(item.url);
  }, [handleClick, item.url]);

  // Callback memoizado para botão textura
  const handleTextureClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handleClick(item.url);
  }, [handleClick, item.url]);

  // Callback memoizado para botão mcstructure
  const handleMcstructureClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.mcstructureUrl) {
      handleClick(item.mcstructureUrl);
    }
  }, [handleClick, item.mcstructureUrl]);

  // Mapeamento otimizado de categorias com cache estático
  const getCategoryTranslation = useCallback((category: string) => {
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
  }, [t]);

  // Obter traduções otimizadas
  const translation = item.translations?.[currentLanguage] || {
    title: item.title || '',
    description: item.description || ''
  };

  const categoryTranslation = getCategoryTranslation(item.category);

  return (
    <Card className="p-0 overflow-hidden cursor-pointer bg-card border" onClick={handleCardClick}>
      {item.imageUrl && (
        <div className="w-full h-64 overflow-hidden bg-muted flex items-center justify-center p-2">
          <img 
            src={item.imageUrl} 
            alt={translation.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-primary/20 rounded">
              <Link className="h-3 w-3 text-primary" />
            </div>
            <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded uppercase">
              {categoryTranslation}
            </span>
          </div>
          <ExternalLink className="h-3 w-3 text-muted-foreground" />
        </div>
        
        <h3 className="text-base font-semibold mb-2 line-clamp-2">
          {translation.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {translation.description}
        </p>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleTextureClick}
          >
            {t('card.texture')}
          </Button>
          {item.mcstructureUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleMcstructureClick}
            >
              Mcstructure
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
});

LinkCardOptimized.displayName = 'LinkCardOptimized';

export default LinkCardOptimized;
