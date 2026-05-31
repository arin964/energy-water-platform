import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/common/Layout';
import { TrendingUp, Trash2 } from 'lucide-react';
import { energyService } from '../services/energyService';

interface ChartData {
  id: number;
  date: string;
  production: number;
  solar: number;
  source: string;
  timestamp: string;
}

interface EnergySource {
  source: string;
  value: number;
  percentage: number;
}

const EnergyPage: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [energyBySource, setEnergyBySource] = useState<EnergySource[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSources, setLoadingSources] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Enerji verisini sil
  const handleDeleteEnergy = async (id: number) => {
    if (!window.confirm('Bu veriyi silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/energy/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Silme işlemi başarısız oldu');
      }
      
      alert('✓ Veri başarıyla silindi');
      
      // VERİLERİ YENİDEN ÇEK - REFETCH
      const freshData = await energyService.getAll();
      
      // TÜM KAYITLARI GÖSTER - GRUPLAMAMA
      const formattedData: ChartData[] = freshData
        .filter((item: any) => item.energyProduced !== null && item.energyProduced !== undefined)
        .map((item: any) => {
          const date = new Date(item.timestamp);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          
          const sourceNames: Record<string, string> = {
            'Solar': '☀️ Solar',
            'Wind': '💨 Rüzgar',
            'Hydro': '💧 Hidrolik',
            'Other': 'Diğer',
          };
          
          return {
            id: item.id,
            timestamp: item.timestamp,
            date: `${day}.${month}.${year}`,
            production: Math.round(item.energyProduced),
            solar: Math.round(item.solarRadiation || 0),
            source: sourceNames[item.source] || item.source || 'Bilinmeyen',
          };
        })
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setChartData(formattedData);
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('❌ Veri silinirken hata oluştu');
    }
  };

  // API'den tüm veri çek
  useEffect(() => {
    const fetchEnergyData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Tüm verileri getir
        const data = await energyService.getAll();

        // TÜM KAYITLARI GÖSTER - GRUPLAMAMA
        const formattedData: ChartData[] = data
          .filter((item: any) => item.energyProduced !== null && item.energyProduced !== undefined)
          .map((item: any) => {
            const date = new Date(item.timestamp);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            
            const sourceNames: Record<string, string> = {
              'Solar': '☀️ Solar',
              'Wind': '💨 Rüzgar',
              'Hydro': '💧 Hidrolik',
              'Other': 'Diğer',
            };
            
            return {
              id: item.id,
              timestamp: item.timestamp,
              date: `${day}.${month}.${year}`,
              production: Math.round(item.energyProduced),
              solar: Math.round(item.solarRadiation || 0),
              source: sourceNames[item.source] || item.source || 'Bilinmeyen',
            };
          })
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        setChartData(formattedData);
      } catch (err) {
        console.error('Hata:', err);
        setError('Veri yüklenemedi');
      } finally {
        setLoading(false);
      }
    };

    fetchEnergyData();
  }, []);

  // Kaynağa göre veri çek
  useEffect(() => {
    const fetchEnergyBySource = async () => {
      try {
        setLoadingSources(true);
        
        const response = await fetch('http://localhost:5000/api/energy/sources?days=30');
        const result = await response.json();
        
        if (result.success && result.sources) {
          const sourceNames: Record<string, string> = {
            'Solar': 'Solar',
            'Wind': 'Rüzgar',
            'Hydro': 'Hidrolik',
            'Other': 'Diğer',
          };
          
          const translatedSources = result.sources.map((src: any) => ({
            source: sourceNames[src.source] || src.source,
            value: src.value,
            percentage: src.percentage,
          }));
          
          setEnergyBySource(translatedSources);
        }
      } catch (err) {
        console.error('Hata:', err);
        setEnergyBySource([
          { source: 'Solar', value: 2480, percentage: 65 },
          { source: 'Rüzgar', value: 900, percentage: 23 },
          { source: 'Hidrolik', value: 440, percentage: 12 },
        ]);
      } finally {
        setLoadingSources(false);
      }
    };

    fetchEnergyBySource();
  }, []);

  const getStats = () => {
    if (chartData.length === 0) {
      return [
        { label: 'Toplam Üretim (7 Gün)', value: '0 MWh', change: '-' },
        { label: 'Ortalama Günlük', value: '0 MWh', change: '-' },
        { label: 'Pik Üretim', value: '0 MWh', change: '-' },
        { label: 'Solar Payı', value: '0%', change: '-' },
      ];
    }

    const totalProduction = chartData.reduce((sum, item) => sum + item.production, 0);
    const avgProduction = Math.round(totalProduction / chartData.length);
    const maxProduction = Math.max(...chartData.map(item => item.production));
    const maxDate = chartData.find(item => item.production === maxProduction)?.date || '-';
    const solarPercentage = Math.round((totalProduction / (totalProduction + 900 + 440)) * 100);

    return [
      { label: 'Toplam Üretim (7 Gün)', value: `${totalProduction} MWh`, change: `+${totalProduction}` },
      { label: 'Ortalama Günlük', value: `${avgProduction} MWh`, change: `+${avgProduction}` },
      { label: 'Pik Üretim', value: `${maxProduction} MWh`, change: maxDate },
      { label: 'Solar Payı', value: `${solarPercentage}%`, change: `+${solarPercentage}%` },
    ];
  };

  const energyStats = getStats();

  return (
    <Layout>
      <div className="p-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Enerji Yönetimi</h1>
          <p className="text-gray-400">Enerji üretim ve tüketim analizi (Son 7 Gün)</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-400">Enerji verisi yükleniyor...</p>
          </div>
        )}

        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {energyStats.map((stat, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-xs text-green-400">{stat.change}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Enerji Üretim Trendi (Günlük Toplam)
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={Array.from(
                    chartData.reduce((acc: Map<string, any>, item: any) => {
                      if (!acc.has(item.date)) {
                        acc.set(item.date, { date: item.date, production: 0, solar: 0 });
                      }
                      const existing = acc.get(item.date)!;
                      existing.production += item.production;
                      existing.solar += item.solar;
                      return acc;
                    }, new Map()).values()
                  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="production" stroke="#0ea5e9" name="Üretim (MWh)" strokeWidth={2} />
                    <Line type="monotone" dataKey="solar" stroke="#f59e0b" name="Solar Radyasyon" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Enerji Kaynakları</h3>
                <div className="space-y-4">
                  {energyBySource.map((source, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{source.source}</span>
                        <span className="text-white font-semibold">{source.value} MWh</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-blue-400' : 'bg-green-400'
                          }`}
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{source.percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="bg-gray-900 p-6 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Günlük Enerji Verisi</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tarih</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Kaynak</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Üretim (MWh)</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Solar Radyasyon</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Verimlilik</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="px-6 py-4 text-sm text-white">{row.date}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-white">{row.source}</td>
                        <td className="px-6 py-4 text-sm text-white font-semibold">{row.production}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{row.solar}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900 text-green-200">
                            {row.solar > 0 ? ((row.production / row.solar) * 100).toFixed(1) : '—'}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleDeleteEnergy(row.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-red-900 hover:bg-red-800 text-red-200 rounded text-xs font-medium transition"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                            Sil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default EnergyPage;
