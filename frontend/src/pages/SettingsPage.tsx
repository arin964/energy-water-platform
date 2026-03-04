import React, { useState, useEffect } from 'react';
import { Settings, Bell, Moon, Globe, Lock, Database, Eye, Volume2 } from 'lucide-react';
import Layout from '../components/common/Layout';

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

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    const saved = localStorage.getItem('settingsData');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [saved, setSaved] = useState(false);

  // Sayfa ilk yüklendiğinde localStorage'ı varsayılan verilerle güncelle
  useEffect(() => {
    const savedData = localStorage.getItem('settingsData');
    if (!savedData) {
      setSettings(defaultSettings);
      localStorage.setItem('settingsData', JSON.stringify(defaultSettings));
    }
  }, []);

  const handleToggle = (key: keyof SettingsState) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }));
    setSaved(false);
  };

  const handleSelectChange = (key: keyof SettingsState, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('settingsData', JSON.stringify(settings));
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

        {/* Başarı Mesajı */}
        {saved && (
          <div className="mb-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-4">
            <p className="text-green-200 text-sm font-medium">✓ Ayarlar başarıyla kaydedildi</p>
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
                value={settings.theme}
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
                value={settings.language}
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
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
              <div className="flex-1">
                <p className="text-white font-medium">Email Bildirimleri</p>
                <p className="text-gray-400 text-sm">Önemli olaylar hakkında email alın</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
              <div className="flex-1">
                <p className="text-white font-medium">Push Bildirimleri</p>
                <p className="text-gray-400 text-sm">Tarayıcı push bildirimleri</p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.pushNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
              <div className="flex-1">
                <p className="text-white font-medium">Ses Bildirimleri</p>
                <p className="text-gray-400 text-sm">Bildirim sesi çal</p>
              </div>
              <button
                onClick={() => handleToggle('soundNotifications')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.soundNotifications ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.soundNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Güvenlik Ayarları */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            Güvenlik
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
              <div className="flex-1">
                <p className="text-white font-medium">İki Faktörlü Kimlik Doğrulama</p>
                <p className="text-gray-400 text-sm">Hesabınızı iki faktörlü doğrulamayla koruyun</p>
              </div>
              <button
                onClick={() => handleToggle('twoFactor')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.twoFactor ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.twoFactor ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <button className="w-full p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors text-left">
              <p className="text-white font-medium">Aktif Oturumları Görüntüle</p>
              <p className="text-gray-400 text-sm">Tüm cihazlarınızdaki oturumları yönetin</p>
            </button>
          </div>
        </div>

        {/* Veri Ayarları */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            Veri Yönetimi
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
              <div className="flex-1">
                <p className="text-white font-medium">Otomatik Yedekleme</p>
                <p className="text-gray-400 text-sm">Verilerinizi otomatik olarak yedekleyin</p>
              </div>
              <button
                onClick={() => handleToggle('autoBackup')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.autoBackup ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.autoBackup ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
              <div className="flex-1">
                <p className="text-white font-medium">Veri Toplama</p>
                <p className="text-gray-400 text-sm">Uygulama geliştirme için veri toplanmasına izin ver</p>
              </div>
              <button
                onClick={() => handleToggle('dataCollection')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.dataCollection ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.dataCollection ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <button className="w-full p-4 bg-red-900 bg-opacity-20 border border-red-700 rounded-lg hover:bg-red-900 hover:bg-opacity-30 transition-colors text-left">
              <p className="text-red-200 font-medium">Tüm Verilerinizi Sil</p>
              <p className="text-red-100 text-sm">Bu işlem geri alınamaz</p>
            </button>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Settings className="w-5 h-5" />
          Ayarları Kaydet
        </button>
      </div>
    </Layout>
  );
};

export default SettingsPage;
