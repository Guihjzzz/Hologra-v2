
import { pt } from './pt';
import { en } from './en';
import { es } from './es';
import { TranslationStructure } from './base';

export const translations: Record<'pt' | 'en' | 'es', TranslationStructure> = {
  pt,
  en,
  es
};

export type { TranslationStructure };
