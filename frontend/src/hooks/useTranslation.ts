import { useSettingsStore } from '../stores/useSettingsStore';
import tr from '../locales/tr.json';
import en from '../locales/en.json';

type TranslationKeys = typeof tr;

export const useTranslation = () => {
  const language = useSettingsStore((state) => state.language);

  const t = (key: string, defaultValue?: string): string => {
    const translations = language === 'tr' ? tr : en;
    
    // Handle nested keys like "settings.title"
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return typeof value === 'string' ? value : defaultValue || key;
  };

  return { t, language };
};
