import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Globe, Lock, Database, Volume2, Check, X } from 'lucide-react';
import Layout from '../components/common/Layout';
import { useSettingsStore, Theme, Language } from '../stores/useSettingsStore';
import { useTranslation } from '../hooks/useTranslation';

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Zustand store'dan ayarları al
  const settings = useSettingsStore();
  const [saved, setSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Toggle fonksiyonları
  const handleThemeChange = (theme: Theme) => {
    settings.setTheme(theme);
  };

  const handleLanguageChange = (language: Language) => {
    settings.setLanguage(language);
  };

  const handleToggleNotification = (type: 'email' | 'push' | 'sound') => {
    if (type === 'email') {
      settings.setEmailNotifications(!settings.emailNotifications);
    } else if (type === 'push') {
      settings.setPushNotifications(!settings.pushNotifications);
    } else if (type === 'sound') {
      settings.setSoundNotifications(!settings.soundNotifications);
    }
  };

  const handleToggleSecurity = (type: 'twoFactor' | 'dataCollection' | 'autoBackup') => {
    if (type === 'twoFactor') {
      settings.setTwoFactor(!settings.twoFactor);
    } else if (type === 'dataCollection') {
      settings.setDataCollection(!settings.dataCollection);
    } else if (type === 'autoBackup') {
      settings.setAutoBackup(!settings.autoBackup);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    settings.reset();
    setShowResetConfirm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Toggle Butonu Bileşeni
  const ToggleButton: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );

  // Select Seçeneği Bileşeni (Tema/Dil)
  const SelectOption: React.FC<{
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  }> = ({ label, value, options, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-gray-900 dark:bg-gray-900 rounded-lg hover:bg-gray-850 dark:hover:bg-gray-800 transition-colors">
      <div>
        <p className="text-white font-medium">{label}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-700 dark:bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none transition-colors cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  // Setting Row Bileşeni
  const SettingRow: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    enabled: boolean;
    onChange: () => void;
  }> = ({ icon, title, description, enabled, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-gray-900 dark:bg-gray-900 rounded-lg hover:bg-gray-850 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="text-blue-400">{icon}</div>
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
      <ToggleButton enabled={enabled} onChange={onChange} />
    </div>
  );

  return (
    <Layout>
      <div className="p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-400" />
            {t('settings.title')}
          </h1>
          <p className="text-gray-400">{t('settings.description')}</p>
        </div>

        {/* Başarılı Kayıt Mesajı */}
        {saved && (
          <div className="mb-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-4 flex items-center gap-3 animate-in">
            <Check className="w-5 h-5 text-green-400" />
            <p className="text-green-200 text-sm font-medium">{t('settings.saved')}</p>
          </div>
        )}

        {/* Grid Layout - İki Sütunlu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* --- GÖRÜNÜM AYARLARI --- */}
          <div className="bg-gray-800 dark:bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Moon className="w-5 h-5 text-blue-400" />
              {t('settings.appearance.title')}
            </h3>

            <div className="space-y-4">
              {/* Tema Seçimi */}
              <SelectOption
                label={t('settings.appearance.theme')}
                value={settings.theme}
                options={[
                  { value: 'dark', label: t('settings.appearance.themeDark') },
                  { value: 'light', label: t('settings.appearance.themeLight') },
                ]}
                onChange={(value) => handleThemeChange(value as Theme)}
              />

              {/* Dil Seçimi */}
              <SelectOption
                label={t('settings.appearance.language')}
                value={settings.language}
                options={[
                  { value: 'tr', label: t('settings.appearance.languageTR') },
                  { value: 'en', label: t('settings.appearance.languageEN') },
                ]}
                onChange={(value) => handleLanguageChange(value as Language)}
              />
            </div>
          </div>

          {/* --- BİLDİRİM AYARLARI --- */}
          <div className="bg-gray-800 dark:bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              {t('settings.notifications.title')}
            </h3>

            <div className="space-y-4">
              <SettingRow
                icon={<Bell className="w-4 h-4" />}
                title={t('settings.notifications.email')}
                description={t('settings.notifications.emailDescription')}
                enabled={settings.emailNotifications}
                onChange={() => handleToggleNotification('email')}
              />

              <SettingRow
                icon={<Bell className="w-4 h-4" />}
                title={t('settings.notifications.push')}
                description={t('settings.notifications.pushDescription')}
                enabled={settings.pushNotifications}
                onChange={() => handleToggleNotification('push')}
              />

              <SettingRow
                icon={<Volume2 className="w-4 h-4" />}
                title={t('settings.notifications.sound')}
                description={t('settings.notifications.soundDescription')}
                enabled={settings.soundNotifications}
                onChange={() => handleToggleNotification('sound')}
              />
            </div>
          </div>

          {/* --- GÜVENLİK AYARLARI --- */}
          <div className="bg-gray-800 dark:bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              {t('settings.security.title')}
            </h3>

            <div className="space-y-4">
              <SettingRow
                icon={<Lock className="w-4 h-4" />}
                title={t('settings.security.twoFactor')}
                description={t('settings.security.twoFactorDescription')}
                enabled={settings.twoFactor}
                onChange={() => handleToggleSecurity('twoFactor')}
              />

              <SettingRow
                icon={<Database className="w-4 h-4" />}
                title={t('settings.security.dataCollection')}
                description={t('settings.security.dataCollectionDescription')}
                enabled={settings.dataCollection}
                onChange={() => handleToggleSecurity('dataCollection')}
              />

              <SettingRow
                icon={<Database className="w-4 h-4" />}
                title={t('settings.security.autoBackup')}
                description={t('settings.security.autoBackupDescription')}
                enabled={settings.autoBackup}
                onChange={() => handleToggleSecurity('autoBackup')}
              />
            </div>
          </div>

          {/* --- PLACEHOLDER (İkinci Sütunun Dolu Kalması İçin) --- */}
          <div className="bg-gray-800 dark:bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              {t('settings.security.title')}
            </h3>
            <p className="text-gray-400 text-sm">
              Daha fazla güvenlik seçeneği yakında eklenecektir.
            </p>
          </div>
        </div>

        {/* Actionlar - Tam Genişlik */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Check className="w-5 h-5" />
            {t('settings.actions.save')}
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <X className="w-5 h-5" />
            {t('settings.actions.reset')}
          </button>
        </div>

        {/* Reset Confirmation Dialog */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-sm">
              <h3 className="text-xl font-bold text-white mb-4">Onayı</h3>
              <p className="text-gray-300 mb-6">{t('settings.actions.resetConfirm')}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  {t('common.delete')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SettingsPage;

