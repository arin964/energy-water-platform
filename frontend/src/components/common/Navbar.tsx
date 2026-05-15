import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, Settings, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { useTranslation } from '../../hooks/useTranslation';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const theme = useSettingsStore((state) => state.theme);
  
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Admin');
  const [hasUnread, setHasUnread] = useState(true);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    navigate('/system-settings');
    setShowAdminMenu(false);
  };

  if (!isLoggedIn) {
    return (
      <div className={`h-16 border-b transition-colors ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      } px-6 flex items-center justify-between`}>
        <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
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
    <div className={`h-16 border-b transition-colors ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
    } px-6 flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Hoş Geldiniz
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-gray-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <Bell size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
            {hasUnread && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
          </button>

          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-72 rounded-lg shadow-lg z-50 border transition-colors ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600'
                : 'bg-white border-gray-100'
            }`}>
              <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {t('navbar.notifications')}
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div
                  onClick={handleNotificationNavigation}
                  className={`p-3 cursor-pointer border-b transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-600 border-gray-600 text-white'
                      : 'hover:bg-gray-50 border-gray-200 text-gray-800'
                  } text-sm`}
                >
                  <p className="font-medium">Baraj seviyesi %90'ı geçti</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    2 saat önce
                  </p>
                </div>
                <div
                  onClick={handleNotificationNavigation}
                  className={`p-3 cursor-pointer border-b transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-600 border-gray-600 text-white'
                      : 'hover:bg-gray-50 border-gray-200 text-gray-800'
                  } text-sm`}
                >
                  <p className="font-medium">Yeni tahmin modeli güncellendi</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    5 saat önce
                  </p>
                </div>
              </div>
              <div className={`p-3 border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} text-center`}>
                <button
                  onClick={handleNotificationNavigation}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium w-full"
                >
                  Tüm bildirimler
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={adminRef}>
          <button
            onClick={() => setShowAdminMenu(!showAdminMenu)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-gray-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <User size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {userName}
            </span>
          </button>

          {showAdminMenu && (
            <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-50 border transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-200 text-gray-800'
            }`}>
              <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} text-sm`}>
                <p className="font-semibold">{userName}</p>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>admin@energywater.com</p>
              </div>
              <div className="py-2">
                <button
                  onClick={handleAdminClick}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Shield size={16} /> {t('sidebar.admin')}
                </button>
                <button
                  onClick={handleProfileClick}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <User size={16} /> {t('sidebar.profile')}
                </button>
                <button
                  onClick={handleSettingsClick}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Settings size={16} /> {t('sidebar.systemSettings')}
                </button>
              </div>
              <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-2`}>
                <button
                  onClick={handleLogout}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 rounded transition-colors ${
                    theme === 'dark'
                      ? 'text-red-400 hover:bg-red-900/20'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <LogOut size={16} /> {t('navbar.logout')}
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
