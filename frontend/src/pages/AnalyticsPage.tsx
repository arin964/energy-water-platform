import React from 'react';
import Layout from '../components/common/Layout';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const performanceData = [
    { ay: 'Ocak', hedef: 85, gerçek: 92, verimlilik: 88 },
    { ay: 'Şubat', hedef: 85, gerçek: 88, verimlilik: 85 },
    { ay: 'Mart', hedef: 90, gerçek: 94, verimlilik: 91 },
    { ay: 'Nisan', hedef: 90, gerçek: 87, verimlilik: 89 },
    { ay: 'Mayıs', hedef: 95, gerçek: 96, verimlilik: 95 },
    { ay: 'Haziran', hedef: 95, gerçek: 93, verimlilik: 92 },
  ];

  const costAnalysis = [
    { kategori: 'Enerji Maliyeti', değer: 45, yüzde: 45 },
    { kategori: 'Su Maliyeti', değer: 28, yüzde: 28 },
    { kategori: 'Bakım', değer: 18, yüzde: 18 },
    { kategori: 'Diğer', değer: 9, yüzde: 9 },
  ];

  const RENKLER = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const analitikler = [
    { başlık: 'Ortalama Verimlililik', değer: '91.5%', trend: '+2.3%', up: true },
    { başlık: 'Maliyet Tasarrufu', değer: '$12,450', trend: '+18.5%', up: true },
    { başlık: 'CO₂ Azaltımı', değer: '245 Ton', trend: '+8.2%', up: true },
    { başlık: 'Ortalama Yanıt Süresi', değer: '2.3 saat', trend: '-15%', up: false },
  ];

  return (
    <Layout>
      <div className="p-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Analiz & Raporlar</h1>
          <p className="text-gray-400">Sistem performansı ve maliyet analizi</p>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analitikler.map((item, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">{item.başlık}</p>
              <p className="text-3xl font-bold text-white mb-2">{item.değer}</p>
              <div className="flex items-center gap-2">
                {item.up ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-blue-400" />
                )}
                <span className={item.up ? 'text-green-400' : 'text-blue-400'} >{item.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Grafikler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performans Trendi */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Aylık Performans Analizi</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="ay" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="hedef" fill="#6366f1" name="Hedef" />
                <Bar dataKey="gerçek" fill="#10b981" name="Gerçek" />
                <Bar dataKey="verimlilik" fill="#f59e0b" name="Verimlilik %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Maliyet Dağılımı */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Maliyet Dağılımı</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costAnalysis}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ kategori, yüzde }) => `${kategori} (${yüzde}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="değer"
                >
                  {costAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RENKLER[index % RENKLER.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detaylı Analiz Tablosu */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="bg-gray-900 p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Kategori Başına Analiz</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Hedef</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Gerçekleşme</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Fark</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Durum</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.slice(0, 3).map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 text-sm text-white font-medium">{row.ay}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{row.hedef}%</td>
                    <td className="px-6 py-4 text-sm text-green-400 font-semibold">{row.gerçek}%</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-green-400">+{row.gerçek - row.hedef}%</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-900 text-green-200">
                        <CheckCircle className="w-4 h-4" />
                        Başarılı
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
