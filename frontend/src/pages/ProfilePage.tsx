import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Phone, MapPin, Camera, Save } from 'lucide-react';
import Layout from '../components/common/Layout';

const defaultProfile = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@energywater.com',
  phone: '+90 (212) 555-1234',
  location: 'Istanbul, Turkey',
  bio: 'Sistem yöneticisi',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [saved, setSaved] = useState(false);

  // Sayfa ilk yüklendiğinde localStorage'ı varsayılan verilerle güncelle
  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (!savedData) {
      setProfile(defaultProfile);
      localStorage.setItem('profileData', JSON.stringify(defaultProfile));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // localStorage'a kaydet
    localStorage.setItem('profileData', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 5000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.newPassword === profile.confirmPassword && profile.newPassword.length > 0) {
      // localStorage'a kaydet
      localStorage.setItem('profileData', JSON.stringify(profile));
      setSaved(true);
      setProfile((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setTimeout(() => setSaved(false), 5000);
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profil Ayarları</h1>
          <p className="text-gray-400">Kişisel bilgilerinizi güncelleyin</p>
        </div>

        {/* Profil Fotoğrafı */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-8">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-400">{profile.email}</p>
              <p className="text-sm text-gray-500 mt-2">Admin Rolü</p>
            </div>
          </div>
        </div>

        {/* Başarı Mesajı */}
        {saved && (
          <div className="mb-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-4">
            <p className="text-green-200 text-sm font-medium">✓ Değişiklikler başarıyla kaydedildi</p>
          </div>
        )}

        {/* Kişisel Bilgiler */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            Kişisel Bilgiler
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Adı</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Soyadı</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Konum
            </label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Biyografi</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            Kaydet
          </button>
        </div>

        {/* Şifre Değiştir */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            Şifre Değiştir
          </h3>

          <form onSubmit={handlePasswordChange}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Mevcut Şifre</label>
              <input
                type="password"
                name="currentPassword"
                value={profile.currentPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Yeni Şifre</label>
              <input
                type="password"
                name="newPassword"
                value={profile.newPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Yeni Şifre Tekrarı</label>
              <input
                type="password"
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {profile.newPassword && profile.newPassword !== profile.confirmPassword && (
              <div className="mb-4 text-red-400 text-sm">Şifreler eşleşmiyor</div>
            )}

            <button
              type="submit"
              disabled={!profile.newPassword}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Lock className="w-5 h-5" />
              Şifreyi Güncelle
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
