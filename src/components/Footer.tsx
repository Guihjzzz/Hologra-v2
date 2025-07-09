
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <div className="text-primary font-bold text-lg mb-2">
            {t('footer.title')}
          </div>
          <div className="flex justify-center space-x-2">
            <div className="w-1 h-1 bg-primary rounded-full"></div>
            <div className="w-1 h-1 bg-primary rounded-full"></div>
            <div className="w-1 h-1 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
