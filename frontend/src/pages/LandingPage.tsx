import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Droplets, BarChart3, ShieldCheck, ArrowRight, BrainCircuit } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
      {/* Hero Section */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex flex-col">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Enerji-Su Platformu
          </span>
          <span className="text-[10px] text-gray-500 tracking-widest uppercase">Nexus v1.0.0</span>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-900/20"
        >
          Sisteme Giriş
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <BrainCircuit size={14} /> Yapay Zeka Destekli Kaynak Yönetimi
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tight">
            Geleceğin Enerjisini <br />
            <span className="text-blue-500">Bugünden Optimize Edin</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Nexus, enerji üretimi ve su tüketim verilerini yapay sinir ağları ile analiz ederek 
            maksimum verimlilik ve minimum kayıp sağlar.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-white text-[#0f172a] font-bold rounded-2xl hover:bg-blue-50 transition-all flex items-center gap-2 group"
            >
              Platformu Keşfet <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Özellikler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/30 border border-gray-700/50 p-8 rounded-3xl hover:border-blue-500/50 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Akıllı Enerji</h3>
            <p className="text-gray-500 leading-relaxed">Güneş radyasyonu ve hava durumu verileriyle üretim tahminlemesi.</p>
          </div>

          <div className="bg-gray-800/30 border border-gray-700/50 p-8 rounded-3xl hover:border-green-500/50 transition-colors group">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Droplets className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Su Yönetimi</h3>
            <p className="text-gray-500 leading-relaxed">Baraj doluluk oranları ve tüketim trendlerinin gerçek zamanlı takibi.</p>
          </div>

          <div className="bg-gray-800/30 border border-gray-700/50 p-8 rounded-3xl hover:border-purple-500/50 transition-colors group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Derin Analiz</h3>
            <p className="text-gray-500 leading-relaxed">Geçmiş verilerden öğrenen algoritmalarla stratejik raporlama.</p>
          </div>
        </div>
      </main>

      {/* BURASI DÜZELDİ: footer etiketi eklendi */}
      <footer className="border-t border-gray-800 py-12 text-center">
        <p className="text-gray-600 text-sm">© 2026 Nexus Energy-Water Management Platform</p>
      </footer>
    </div>
  );
};

export default LandingPage;