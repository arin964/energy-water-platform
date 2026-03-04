import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, Settings, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Admin');
  const notificationRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mouse dışında tıklanırsa dropdown kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
        setShowAdminMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAdminMenu(false);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAdminClick = () => {
    navigate('/admin');
    setShowAdminMenu(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowAdminMenu(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setShowAdminMenu(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Hoş Geldiniz
        </h2>
        <button 
          onClick={() => setIsLoggedIn(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Giriş Yap
        </button>
      </div>
    );
  }

  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Hoş Geldiniz
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-800 dark:text-white">Bildirimler</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer border-b border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Baraj seviyesi %90'ı geçti</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 saat önce</p>
                </div>
                <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer border-b border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Yeni tahmin modeli güncellendi</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">5 saat önce</p>
                </div>
                <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Enerji üretimi bekleninin altında</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 gün önce</p>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-600 text-center">
                <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Tüm bildirimler</a>
              </div>
            </div>
          )}
        </div>

        {/* Admin Menu */}
        <div className="relative" ref={adminRef}>
          <button 
            onClick={() => setShowAdminMenu(!showAdminMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <User size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{userName}</span>
          </button>

          {/* Admin Dropdown */}
          {showAdminMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <p className="text-sm font-semibold text-white">{userName}</p>
                <p className="text-xs text-gray-400">admin@energywater.com</p>
              </div>
              
              <div className="py-2">
                <button 
                  onClick={handleAdminClick}
                  className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                >
                  <Shield size={16} />
                  Admin Paneli
                </button>
                <button 
                  onClick={handleProfileClick}
                  className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                >
                  <User size={16} />
                  Profil Ayarları
                </button>
                <button 
                  onClick={handleSettingsClick}
                  className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                >
                  <Settings size={16} />
                  Sistem Ayarları
                </button>
              </div>

              <div className="border-t border-gray-700 p-2">
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900 hover:bg-opacity-20 flex items-center gap-2 transition-colors rounded"
                >
                  <LogOut size={16} />
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
