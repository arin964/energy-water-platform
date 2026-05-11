import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Droplet, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  LineChart 
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Navigasyon */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full z-10">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-blue-400">Enerji-Su Platformu</h2>
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Nexus V1.0.0</span>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          Sisteme Giriş
        </button>
      </nav>

      <main className="flex-1 flex flex-col items-center pt-20 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8 animate-pulse">
          <Cpu size={14} />
          <span>Yapay Sinir Ağları Destekli Yeni Nesil İzleme</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 tracking-tight leading-tight">
          Geleceğin Enerjisini <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Bugünden Optimize Edin
          </span>
        </h1>

        <p className="max-w-2xl text-center text-gray-400 text-lg md:text-xl mb-12 leading-relaxed">
          Nexus; karmaşık veri setlerini analiz ederek enerji ve su kaynaklarınızı 
          maksimum verimlilikle yönetmenizi sağlar.
        </p>

        {/* YÖNLENDİRME DEĞİŞTİ: Artık /explore rotasına gidiyor */}
        <button 
          onClick={() => navigate('/explore')} 
          className="group relative flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-white/5"
        >
          Platformu Keşfet
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Alt Özellikler */}
        <section className="w-full max-w-7xl mx-auto py-32 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Zap className="text-yellow-400" />}
              title="Akıllı Enerji"
              desc="Solar radyasyon ve üretim trendlerini gerçek zamanlı takip edin."
            />
            <FeatureCard 
              icon={<Droplet className="text-blue-400" />}
              title="Su Optimizasyonu"
              desc="Baraj doluluk oranları ve tüketim tahminleri ile planlama yapın."
            />
            <FeatureCard 
              icon={<LineChart className="text-purple-400" />}
              title="Yapay Zeka Analizi"
              desc="Derin öğrenme modelleri ile olası kesintileri önceden görün."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-green-400" />}
              title="Kritik Uyarılar"
              desc="Anlık bildirim sistemi ile riskli durumları saniyeler içinde yönetin."
            />
          </div>
        </section>
      </main>

      <footer className="p-8 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>© 2026 Nexus Energy-Water Platform. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all hover:bg-white/[0.07] group cursor-default">
    <div className="mb-4 p-3 bg-white/5 inline-block rounded-2xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="text-xl font-semibold mb-3">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;