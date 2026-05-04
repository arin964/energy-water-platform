import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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


const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/energy', icon: Zap, label: 'Enerji' },
    { path: '/water', icon: Droplet, label: 'Su Yönetimi' },
    { path: '/forecast', icon: TrendingUp, label: 'Tahminler' },
    { path: '/optimization', icon: Target, label: 'Optimizasyon' },
    { path: '/analytics', icon: BarChart3, label: 'Analiz' },
    { path: '/alerts', icon: Bell, label: 'Uyarılar' },
  ];

  const adminItems = [
    { path: '/data-import', icon: Upload, label: 'Veri İçe Aktarma' },
    { path: '/settings', icon: Settings, label: 'Ayarlar' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-400">Enerji-Su Platform</h1>
        <p className="text-sm text-gray-400 mt-1">AI Destekli Optimizasyon</p>
      </div>

      <nav className="flex-1">
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
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Admin Bölümü */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-xs font-semibold text-gray-500 uppercase px-4 mb-3">Yönetim</p>
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
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <div className="text-xs text-gray-500">
          <p>© 2025 Energy-Water</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
