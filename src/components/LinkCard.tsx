
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LinkItem } from "@/hooks/useLinks";

interface LinkCardProps {
  item: LinkItem;
}

const LinkCard = ({ item }: LinkCardProps) => {
  const { t, currentLanguage } = useLanguage();
  
  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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

  // Obter traduções do item atual
  const getItemTranslation = () => {
    if (item.translations && item.translations[currentLanguage]) {
      return item.translations[currentLanguage];
    }
    // Fallback para formato legado
    return {
      title: item.title || '',
      description: item.description || ''
    };
  };

  const translation = getItemTranslation();

  return (
    <Card className="p-0 overflow-hidden cursor-pointer bg-card border" onClick={() => handleClick(item.url)}>
      {item.imageUrl && (
        <div className="w-full h-64 overflow-hidden bg-muted flex items-center justify-center p-2">
          <img 
            src={item.imageUrl} 
            alt={translation.title}
            className="w-full h-full object-cover"
            loading="lazy"
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
              {getCategoryTranslation(item.category)}
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
            onClick={(e) => {
              e.stopPropagation();
              handleClick(item.url);
            }}
          >
            {t('card.texture')}
          </Button>
          {item.mcstructureUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(item.mcstructureUrl!);
              }}
            >
              Mcstructure
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LinkCard;
