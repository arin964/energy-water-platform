import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, Settings, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Admin');
  
  // F5 yapınca true olarak başlar (istediğin gibi işaret gelir).
  // Uygulama içinde gezerken (Dashboard dahil) React state'i korur.
  const [hasUnread, setHasUnread] = useState(true);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // NotificationsPage'den gelecek "bildirimler okundu" sinyalini dinle
    const handleReadSignal = () => setHasUnread(false);
    window.addEventListener('notificationsRead', handleReadSignal);

    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
        setShowAdminMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('notificationsRead', handleReadSignal);
    };
  }, []);

  const handleNotificationNavigation = () => {
    setHasUnread(false); 
    setShowNotifications(false); 
    navigate('/notifications'); 
  };

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
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Hoş Geldiniz</h2>
        <button onClick={() => setIsLoggedIn(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Giriş Yap</button>
      </div>
    );
  }

  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Hoş Geldiniz</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationRef}>
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            {hasUnread && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50 border border-gray-100 dark:border-gray-600">
              <div className="p-4 border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white">
                <h3 className="font-semibold">Bildirimler</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div onClick={handleNotificationNavigation} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white text-sm">
                  <p className="font-medium">Baraj seviyesi %90'ı geçti</p>
                  <p className="text-xs text-gray-500">2 saat önce</p>
                </div>
                <div onClick={handleNotificationNavigation} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white text-sm">
                  <p className="font-medium">Yeni tahmin modeli güncellendi</p>
                  <p className="text-xs text-gray-500">5 saat önce</p>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-600 text-center">
                <button onClick={handleNotificationNavigation} className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium w-full">Tüm bildirimler</button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={adminRef}>
          <button onClick={() => setShowAdminMenu(!showAdminMenu)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <User size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{userName}</span>
          </button>

          {showAdminMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-700 text-white">
              <div className="p-4 border-b border-gray-700 text-sm">
                <p className="font-semibold">{userName}</p>
                <p className="text-xs text-gray-400">admin@energywater.com</p>
              </div>
              <div className="py-2">
                <button onClick={handleAdminClick} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2"><Shield size={16} /> Admin Paneli</button>
                <button onClick={handleProfileClick} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2"><User size={16} /> Profil Ayarları</button>
                <button onClick={handleSettingsClick} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2"><Settings size={16} /> Sistem Ayarları</button>
              </div>
              <div className="border-t border-gray-700 p-2">
                <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900/20 flex items-center gap-2 rounded"><LogOut size={16} /> Çıkış Yap</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;