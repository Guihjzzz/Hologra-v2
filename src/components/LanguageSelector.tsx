
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSelector = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode as Language);
  };

  const currentLanguageData = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select 
        onValueChange={handleLanguageChange} 
        value={currentLanguage}
      >
        <SelectTrigger className="w-[140px] h-8 text-sm">
          <SelectValue>
            {currentLanguageData && (
              <span className="flex items-center gap-2">
                <span>{currentLanguageData.flag}</span>
                <span>{t(`languages.${currentLanguage}`)}</span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-background border shadow-lg z-50">
          {languages.map((language) => (
            <SelectItem 
              key={language.code} 
              value={language.code}
              className="cursor-pointer hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <span>{language.flag}</span>
                <span>{t(`languages.${language.code}`)}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
