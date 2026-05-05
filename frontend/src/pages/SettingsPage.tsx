import React, { useState, useEffect, createContext, useContext } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Globe, Lock, Database, Eye, Volume2 } from 'lucide-react';
import Layout from '../components/common/Layout';

// --- CONTEXT YAPISI ---

interface SettingsState {
  theme: 'dark' | 'light';
  language: 'tr' | 'en';
  emailNotifications: boolean;
  pushNotifications: boolean;
  dataCollection: boolean;
  autoBackup: boolean;
  twoFactor: boolean;
  soundNotifications: boolean;
}

const defaultSettings: SettingsState = {
  theme: 'dark',
  language: 'tr',
  emailNotifications: true,
  pushNotifications: true,
  dataCollection: true,
  autoBackup: true,
  twoFactor: false,
  soundNotifications: true,
};

interface SettingsContextType {
  settings: SettingsState;
  updateGlobalSettings: (newSettings: Partial<SettingsState>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// App.tsx'de kullandığın SettingsProvider burada tanımlanıyor
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    const saved = localStorage.getItem('settingsData');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Tema değişikliğini HTML seviyesinde uygular
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(settings.theme);
    localStorage.setItem('settingsData', JSON.stringify(settings));
  }, [settings]);

  const updateGlobalSettings = (newSettings: Partial<SettingsState>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateGlobalSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useGlobalSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useGlobalSettings must be used within a SettingsProvider');
  return context;
};

// --- SAYFA BİLEŞENİ ---

export const SettingsPage: React.FC = () => {
  const { settings: globalSettings, updateGlobalSettings } = useGlobalSettings();
  
  // Yerel state, "Kaydet" butonuna basana kadar değişiklikleri tutar
  const [localSettings, setLocalSettings] = useState<SettingsState>(globalSettings);
  const [saved, setSaved] = useState(false);

  const handleToggle = (key: keyof SettingsState) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }));
    setSaved(false);
  };

  const handleSelectChange = (key: keyof SettingsState, value: any) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateGlobalSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 5000);
  };

  return (
    <Layout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sistem Ayarları</h1>
          <p className="text-gray-400">Uygulamayı tercihlerinize göre özelleştirin</p>
        </div>

        {saved && (
          <div className="mb-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-4">
            <p className="text-green-200 text-sm font-medium">✓ Ayarlar başarıyla kaydedildi ve uygulandı</p>
          </div>
        )}

        {/* Görünüm Ayarları */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Moon className="w-5 h-5 text-blue-400" />
            Görünüm
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div>
                <p className="text-white font-medium">Tema</p>
                <p className="text-gray-400 text-sm">Uygulamanın renklendirilmesi</p>
              </div>
              <select
                value={localSettings.theme}
                onChange={(e) => handleSelectChange('theme', e.target.value as 'dark' | 'light')}
                className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="dark">Koyu (Dark)</option>
                <option value="light">Açık (Light)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div>
                <p className="text-white font-medium">Dil</p>
                <p className="text-gray-400 text-sm">Arayüz dilini seçin</p>
              </div>
              <select
                value={localSettings.language}
                onChange={(e) => handleSelectChange('language', e.target.value as 'tr' | 'en')}
                className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bildirim Ayarları */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-400" />
            Bildirimler
          </h3>

          <div className="space-y-4">
            {(['emailNotifications', 'pushNotifications', 'soundNotifications'] as const).map((key) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
                <div className="flex-1">
                  <p className="text-white font-medium">
                    {key === 'emailNotifications' ? 'Email Bildirimleri' : 
                     key === 'pushNotifications' ? 'Push Bildirimleri' : 'Ses Bildirimleri'}
                  </p>
                  <p className="text-gray-400 text-sm">Bildirim alımını yönetin</p>
                </div>
                <button
                  onClick={() => handleToggle(key)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    localSettings[key] ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      localSettings[key] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Kaydet Butonu */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <SettingsIcon className="w-5 h-5" />
          Ayarları Kaydet
        </button>
      </div>
    </Layout>
  );
};

export default SettingsPage;