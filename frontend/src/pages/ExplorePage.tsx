import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Droplet, 
  TrendingUp, 
  ArrowLeft, 
  Lock, 
  AlertTriangle,
  LayoutDashboard,
  Target,
  LineChart
} from 'lucide-react';

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* Üst Bilgi Çubuğu - Proje Renkleriyle Uyumlu */}
      <div className="bg-[#111827]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/welcome')} 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Tanıtıma Dön
          </button>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <p className="text-xs tracking-widest text-blue-400 uppercase font-semibold">
            Nexus Platform Vitrini
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold text-xs transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          Tam Erişime Geç
        </button>
      </div>

      <div className="flex flex-1 relative">
        {/* Projenin Gerçek Sidebar Görünümü (Silüet) */}
        <div className="w-64 bg-[#0a0f1e] border-r border-white/5 p-6 hidden lg:flex flex-col gap-6 opacity-30 pointer-events-none">
          <div className="space-y-4">
            {[
              { label: 'Dashboard', icon: LayoutDashboard },
              { label: 'Enerji', icon: Zap },
              { label: 'Su Yönetimi', icon: Droplet },
              { label: 'Tahminler', icon: TrendingUp },
              { label: 'Optimizasyon', icon: Target },
              { label: 'Analiz', icon: LineChart }
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl ${i === 0 ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500'}`}>
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ana İçerik Alanı */}
        <main className="flex-1 p-8 overflow-y-auto relative bg-[#0f172a]/30">
          
          {/* Dashboard Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Sistem Kabiliyetleri
            </h1>
            <p className="text-gray-500 mt-2 text-sm max-w-2xl">
              Yapay zeka modellerimizin sunduğu analiz ve optimizasyon modüllerini aşağıda interaktif olarak inceleyebilirsiniz.
            </p>
          </div>

          {/* Gerçek Proje Tasarımındaki Kartlar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <PreviewCard 
              title="Enerji Tasarrufu" 
              value="42%" 
              trend="+12.5%" 
              icon={<Zap className="text-blue-400" />} 
              color="blue"
            />
            <PreviewCard 
              title="Su Tasarrufu" 
              value="18%" 
              trend="+8.2%" 
              icon={<Droplet className="text-green-400" />} 
              color="green"
            />
            <PreviewCard 
              title="Tahmin Güveni" 
              value="94%" 
              trend="Stabil" 
              icon={<TrendingUp className="text-purple-400" />} 
              color="purple"
            />
            <PreviewCard 
              title="Maliyet Azalışı" 
              value="₺89K" 
              trend="Aylık" 
              icon={<Target className="text-yellow-400" />} 
              color="yellow"
            />
          </div>

          {/* Kilitli Grafik ve Analiz Paneli (Enerji & Tahmin Sayfası Karması) */}
          <div className="bg-[#111827] rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-3 text-gray-200">
                <LineChart className="text-blue-500" size={20} />
                Gerçek Zamanlı Üretim & Tahmin Analizi
              </h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-cyan-500/50"></div>
              </div>
            </div>

            {/* Güvenlik Overlay - Proje Estetiğine Uygun Blur */}
            <div className="absolute inset-0 top-[73px] bg-[#0a0f1e]/60 backdrop-blur-md z-10 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-blue-600/10 p-5 rounded-3xl border border-blue-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Lock className="text-blue-500" size={36} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Kritik Veri Koruması</h3>
              <p className="text-gray-400 max-w-md text-sm leading-relaxed mb-8">
                Bu modül, tesisinize ait anlık sensör verilerini ve özel eğitilmiş yapay sinir ağı çıktılarını içerir. Erişim için yetkili kullanıcı girişi gereklidir.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-white text-black px-8 py-3 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-all active:scale-95"
                >
                  Giriş Yap
                </button>
                <button 
                   onClick={() => navigate('/welcome')}
                   className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-2xl font-bold text-sm border border-white/10 transition-all"
                >
                  Geri Dön
                </button>
              </div>
            </div>

            {/* Arkadaki Temsili Grafik (Enerji Trendi Sayfası Silüeti) */}
            <div className="p-10 h-80 flex items-end justify-between gap-1 opacity-10">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm" 
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Alt Bilgi - Protokol Notu */}
          <div className="mt-10 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <AlertTriangle className="text-blue-400" size={20} />
            </div>
            <p className="text-xs text-blue-400/80 font-medium tracking-wide">
              BİLGİ: Nexus Güvenlik Protokolü (V1.2) uyarınca, ön izleme modunda veritabanı yazma yetkileri devre dışı bırakılmıştır.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

// Proje Kart Tasarımıyla Uyumlu PreviewCard
const PreviewCard = ({ title, value, trend, icon, color }: any) => {
  const colorMap: any = {
    blue: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
    green: 'border-green-500/20 bg-green-500/5 text-green-400',
    purple: 'border-purple-500/20 bg-purple-500/5 text-purple-400',
    yellow: 'border-yellow-500/20 bg-yellow-500/5 text-yellow-400',
  };

  return (
    <div className={`p-6 rounded-[2rem] border transition-all hover:scale-[1.02] cursor-default ${colorMap[color]}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl">
          {icon}
        </div>
        <span className="text-[10px] font-bold py-1 px-2 bg-white/10 rounded-full">{trend}</span>
      </div>
      <h3 className="text-3xl font-black text-white">{value}</h3>
      <p className="text-xs opacity-60 font-medium mt-1 uppercase tracking-widest">{title}</p>
    </div>
  );
};

export default ExplorePage;