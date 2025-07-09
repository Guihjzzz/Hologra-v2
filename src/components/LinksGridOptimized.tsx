
import React, { memo } from 'react';
import LinkCardOptimized from "@/components/LinkCardOptimized";
import { LinkItem } from "@/hooks/useLinksOptimized";
import { useLanguage } from "@/contexts/LanguageContext";

interface LinksGridProps {
  links: LinkItem[];
}

const LinksGridOptimized = memo(({ links }: LinksGridProps) => {
  const { t } = useLanguage();

  if (links.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-card rounded-xl p-6 border max-w-lg mx-auto">
          <p className="text-lg text-muted-foreground mb-3">
            {t('results.noResults')}
          </p>
          <p className="text-muted-foreground">
            {t('results.noResultsDescription')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {links.map((item) => (
        <LinkCardOptimized
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
});

LinksGridOptimized.displayName = 'LinksGridOptimized';

export default LinksGridOptimized;
