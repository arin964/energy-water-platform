import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';
export type Language = 'tr' | 'en';

export interface SettingsState {
  theme: Theme;
  language: Language;
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundNotifications: boolean;
  autoBackup: boolean;
  dataCollection: boolean;
  twoFactor: boolean;
  
  // Actions
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setEmailNotifications: (value: boolean) => void;
  setPushNotifications: (value: boolean) => void;
  setSoundNotifications: (value: boolean) => void;
  setAutoBackup: (value: boolean) => void;
  setDataCollection: (value: boolean) => void;
  setTwoFactor: (value: boolean) => void;
  
  // Batch update
  updateSettings: (settings: Partial<Omit<SettingsState, keyof SettingsStore['actions']>>) => void;
  
  // Reset
  reset: () => void;
}

interface SettingsStore extends SettingsState {
  actions: {
    setTheme: (theme: Theme) => void;
    setLanguage: (language: Language) => void;
    setEmailNotifications: (value: boolean) => void;
    setPushNotifications: (value: boolean) => void;
    setSoundNotifications: (value: boolean) => void;
    setAutoBackup: (value: boolean) => void;
    setDataCollection: (value: boolean) => void;
    setTwoFactor: (value: boolean) => void;
    updateSettings: (settings: Partial<Omit<SettingsState, keyof SettingsStore['actions']>>) => void;
    reset: () => void;
  };
}

const defaultSettings: Omit<SettingsState, keyof SettingsStore['actions']> = {
  theme: 'dark',
  language: 'tr',
  emailNotifications: true,
  pushNotifications: true,
  soundNotifications: true,
  autoBackup: true,
  dataCollection: true,
  twoFactor: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setTheme: (theme: Theme) => {
        set({ theme });
        // Apply theme to HTML element
        const html = document.documentElement;
        if (theme === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      },

      setLanguage: (language: Language) => {
        set({ language });
        // Store language for i18n
        localStorage.setItem('language', language);
      },

      setEmailNotifications: (value: boolean) => set({ emailNotifications: value }),
      setPushNotifications: (value: boolean) => set({ pushNotifications: value }),
      setSoundNotifications: (value: boolean) => set({ soundNotifications: value }),
      setAutoBackup: (value: boolean) => set({ autoBackup: value }),
      setDataCollection: (value: boolean) => set({ dataCollection: value }),
      setTwoFactor: (value: boolean) => set({ twoFactor: value }),

      updateSettings: (settings) => {
        set((state) => {
          const newState = { ...state, ...settings };

          // Apply theme if changed
          if (settings.theme && settings.theme !== state.theme) {
            const html = document.documentElement;
            if (settings.theme === 'dark') {
              html.classList.add('dark');
            } else {
              html.classList.remove('dark');
            }
          }

          // Store language if changed
          if (settings.language && settings.language !== state.language) {
            localStorage.setItem('language', settings.language);
          }

          return newState;
        });
      },

      reset: () => {
        set(defaultSettings);
        document.documentElement.classList.add('dark');
        localStorage.removeItem('language');
      },
    }),
    {
      name: 'energy-water-settings', // localStorage key
      version: 1,
      onRehydrateStorage: () => (state) => {
        // Apply theme when app loads from storage
        if (state) {
          const html = document.documentElement;
          if (state.theme === 'dark') {
            html.classList.add('dark');
          } else {
            html.classList.remove('dark');
          }
        }
      },
    }
  )
);
