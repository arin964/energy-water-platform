import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Zap, 
  Droplet, 
  TrendingUp, 
  Settings, 
  Bell, 
  BarChart3,
  Target,
  Upload
} from 'lucide-react';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { useTranslation } from '../../hooks/useTranslation';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useSettingsStore((state) => state.theme);
  const { t } = useTranslation();

  const menuItems = [
    { path: '/', icon: Home, label: t('navbar.dashboard'), labelKey: 'navbar.dashboard' },
    { path: '/energy', icon: Zap, label: t('navbar.energy'), labelKey: 'navbar.energy' },
    { path: '/water', icon: Droplet, label: t('navbar.water'), labelKey: 'navbar.water' },
    { path: '/forecast', icon: TrendingUp, label: t('navbar.forecast'), labelKey: 'navbar.forecast' },
    { path: '/optimization', icon: Target, label: t('navbar.optimization'), labelKey: 'navbar.optimization' },
    { path: '/analytics', icon: BarChart3, label: t('navbar.analytics'), labelKey: 'navbar.analytics' },
    { path: '/alerts', icon: Bell, label: t('navbar.alerts'), labelKey: 'navbar.alerts' },
  ];

  const adminItems = [
    { path: '/data-import', icon: Upload, label: t('sidebar.dataImport'), labelKey: 'sidebar.dataImport' },
    { path: '/settings', icon: Settings, label: t('settings.title'), labelKey: 'settings.title' },
  ];

  return (
    <div className={`h-screen w-64 text-white p-4 flex flex-col transition-colors ${
      theme === 'dark'
        ? 'bg-gray-900'
        : 'bg-gray-100'
    }`}>
      
      {/* Tıklanabilir Logo Bölümü */}
      <div 
        onClick={() => navigate('/welcome')} 
        className="mb-8 cursor-pointer group select-none"
      >
        <h1 className={`text-2xl font-bold group-hover:text-blue-400 transition-colors ${
          theme === 'dark'
            ? 'text-white'
            : 'text-gray-800'
        }`}>
          Enerji-Su Platformu
        </h1>
        <p className={`text-[10px] font-medium tracking-wider uppercase ${
          theme === 'dark'
            ? 'text-blue-400/70'
            : 'text-blue-600/70'
        }`}>
          AI Destekli Optimizasyon
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Yönetim Bölümü */}
        <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
          <p className={`text-xs font-semibold uppercase px-4 mb-3 tracking-widest ${
            theme === 'dark'
              ? 'text-gray-500'
              : 'text-gray-600'
          }`}>
            {t('sidebar.admin')}
          </p>
          <ul className="space-y-2">
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Alt Bilgi */}
      <div className={`mt-auto pt-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
        <div className={`text-[10px] flex justify-between items-center px-2 ${
          theme === 'dark'
            ? 'text-gray-500'
            : 'text-gray-600'
        }`}>
          <p>© 2025 Energy-Water</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;