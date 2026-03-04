import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { Zap, TrendingUp, PieChart as PieChartIcon, CheckCircle } from 'lucide-react';

interface Scenario {
  id: number;
  name: string;
  description: string;
  energySavings: number;
  waterSavings: number;
  costReduction: number;
  status: 'active' | 'inactive';
  savings: { category: string; percentage: number }[];
}

const OptimizationPage: React.FC = () => {
  const [scenarios] = useState<Scenario[]>([
    {
      id: 1,
      name: 'Peak Load Yönetimi',
      description: 'Pik saatlerde yükü daha verimli bir şekilde dağıt',
      energySavings: 15,
      waterSavings: 8,
      costReduction: 22000,
      status: 'active',
      savings: [
        { category: 'Enerji', percentage: 15 },
        { category: 'Su', percentage: 8 },
      ],
    },
    {
      id: 2,
      name: 'Yenilenebilir Entegrasyonu',
      description: 'Solar üretimini tam kapasite kullan',
      energySavings: 28,
      waterSavings: 12,
      costReduction: 45000,
      status: 'active',
      savings: [
        { category: 'Enerji', percentage: 28 },
        { category: 'Su', percentage: 12 },
      ],
    },
    {
      id: 3,
      name: 'Su Tasarrufu Programı',
      description: 'Tüketimi düşürmek için yeni sistemler kurulması',
      energySavings: 8,
      waterSavings: 35,
      costReduction: 38000,
      status: 'inactive',
      savings: [
        { category: 'Enerji', percentage: 8 },
        { category: 'Su', percentage: 35 },
      ],
    },
  ]);

  const [recommendations] = useState([
    {
      title: 'Solar Panel Kapasitesi Artırılsın',
      impact: 'Enerji Tasarrufu: +18%',
      priority: 'high',
      roi: '3.2 Yıl',
    },
    {
      title: 'Baraj Seviyesine Göre Suya Başlayın',
      impact: 'Su Tasarrufu: +12%',
      priority: 'medium',
      roi: '2.1 Yıl',
    },
    {
      title: 'Gece Saatlerinde Üretimi Arttırılsın',
      impact: 'Enerji Maliyeti: -15%',
      priority: 'medium',
      roi: '1.8 Yıl',
    },
    {
      title: 'Yapay Zeka Tabanlı Yük Dengelemesi',
      impact: 'Verimlilik: +22%',
      priority: 'high',
      roi: '2.5 Yıl',
    },
  ]);

  const [currentSavings] = useState({
    totalEnergy: 42,
    totalWater: 18,
    monthlyReduction: 89000,
  });

  return (
    <Layout>
      <div className="p-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Optimizasyon</h1>
          <p className="text-gray-400">Enerji ve su kaynaklarını optimize et</p>
        </div>

        {/* Mevcut Tasarruflar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-200">Enerji Tasarrufu</h3>
              <Zap className="w-6 h-6 text-blue-300" />
            </div>
            <p className="text-4xl font-bold text-white mb-2">{currentSavings.totalEnergy}%</p>
            <p className="text-sm text-blue-200">Bu ayın tasarrufu</p>
          </div>

          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-200">Su Tasarrufu</h3>
              <PieChartIcon className="w-6 h-6 text-green-300" />
            </div>
            <p className="text-4xl font-bold text-white mb-2">{currentSavings.totalWater}%</p>
            <p className="text-sm text-green-200">Bu ayın tasarrufu</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-lg p-6 border border-yellow-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-yellow-200">Aylık Tasarruf</h3>
              <TrendingUp className="w-6 h-6 text-yellow-300" />
            </div>
            <p className="text-4xl font-bold text-white mb-2">₺{(currentSavings.monthlyReduction / 1000).toFixed(0)}K</p>
            <p className="text-sm text-yellow-200">Maliyet tasarrufu</p>
          </div>
        </div>

        {/* Aktivasyon Senaryoları */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Optimizasyon Senaryoları</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <div 
                key={scenario.id} 
                className={`rounded-lg border p-6 transition-all ${
                  scenario.status === 'active'
                    ? 'bg-gray-800 border-green-600'
                    : 'bg-gray-800 border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{scenario.name}</h3>
                  {scenario.status === 'active' && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-4">{scenario.description}</p>

                <div className="space-y-3 mb-4">
                  {scenario.savings.map((saving, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-300">{saving.category} Tasarrufu</span>
                      <span className="text-white font-semibold">+{saving.percentage}%</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm border-t border-gray-700 pt-3">
                    <span className="text-gray-300">Aylık Maliyet Azalışı</span>
                    <span className="text-green-400 font-semibold">₺{(scenario.costReduction / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                <button 
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
                    scenario.status === 'active'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  }`}
                >
                  {scenario.status === 'active' ? 'Aktif' : 'Etkinleştir'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Öneriler */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Sistem Önerileri</h2>
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{rec.title}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-green-400">{rec.impact}</span>
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${
                        rec.priority === 'high'
                          ? 'bg-red-900 text-red-200'
                          : 'bg-yellow-900 text-yellow-200'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">ROI</p>
                    <p className="text-lg font-bold text-white">{rec.roi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OptimizationPage;
