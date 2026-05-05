
import React, { useState } from 'react';
import { 
  Settings, Server, Database, ShieldAlert, 
  RefreshCw, Activity, Cpu, HardDrive 
} from 'lucide-react';
import Layout from '../components/common/Layout';

export const SystemSettingsPage: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSystemReset = () => {
    if(window.confirm("Sistem cache verileri temizlenecek. Emin misiniz?")) {
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 2000);
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Server className="text-blue-500 w-10 h-10" />
              Sistem Yönetim Paneli
            </h1>
            <p className="text-gray-400">Nexus Platformu çekirdek parametreleri ve sunucu durumu</p>
          </div>
          <div className="flex gap-3">
            <span className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-mono">
              <Activity className="w-3 h-3 animate-pulse" /> SUNUCU AKTİF
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Sunucu Sağlık Kartları */}
          {[
            { label: 'CPU Kullanımı', value: '%12', icon: Cpu, color: 'text-blue-400' },
            { label: 'Bellek Durumu', value: '1.2GB / 4GB', icon: HardDrive, color: 'text-purple-400' },
            { label: 'DB Gecikme', value: '24ms', icon: Database, color: 'text-amber-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-800/40 border border-gray-700 p-5 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <stat.icon className={`${stat.color} w-5 h-5`} />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Veri Entegrasyon Ayarları */}
          <section className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-700 bg-gray-800/50">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-400" /> Veri Senkronizasyonu
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Otomatik API Yenileme</p>
                  <p className="text-gray-400 text-sm">Sensör verileri her 5 dakikada bir güncellenir</p>
                </div>
                <div className="flex items-center gap-4">
                  <select className="bg-gray-900 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500">
                    <option>1 Dakika</option>
                    <option selected>5 Dakika</option>
                    <option>15 Dakika</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RefreshCw className={`w-5 h-5 text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="text-sm text-blue-200">Sistem önbelleğini manuel olarak temizle</span>
                </div>
                <button 
                  onClick={handleSystemReset}
                  disabled={isRefreshing}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all"
                >
                  {isRefreshing ? 'TEMİZLENİYOR...' : 'ŞİMDİ TEMİZLE'}
                </button>
              </div>
            </div>
          </section>

          {/* Güvenlik Modu */}
          <section className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold mb-1">Bakım Modu (Maintenance Mode)</h3>
                <p className="text-gray-400 text-sm mb-4">Aktif edildiğinde platform tüm kullanıcılara kapatılır ve sadece admin girişi yapılabilir.</p>
                <button className="px-6 py-2 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-sm font-bold transition-all">
                  BAKIM MODUNU BAŞLAT
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default SystemSettingsPage;