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

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      
      {/* Tıklanabilir Logo Bölümü */}
      <div 
        onClick={() => navigate('/welcome')} 
        className="mb-8 cursor-pointer group select-none"
      >
        <h1 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
          Enerji-Su Platformu
        </h1>
        <p className="text-[10px] text-blue-400/70 font-medium tracking-wider uppercase">
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
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-xs font-semibold text-gray-500 uppercase px-4 mb-3 tracking-widest">
            Yönetim
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
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
      <div className="mt-auto pt-4 border-t border-gray-800">
        <div className="text-[10px] text-gray-500 flex justify-between items-center px-2">
          <p>© 2025 Energy-Water</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;