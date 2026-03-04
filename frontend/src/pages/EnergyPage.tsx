import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/common/Layout';
import { TrendingUp } from 'lucide-react';

interface EnergyData {
  date: string;
  production: number;
  solar: number;
}

const EnergyPage: React.FC = () => {
  const [energyData] = useState<EnergyData[]>([
    { date: '01.10', production: 450, solar: 680 },
    { date: '02.10', production: 520, solar: 750 },
    { date: '03.10', production: 480, solar: 670 },
    { date: '04.10', production: 610, solar: 800 },
    { date: '05.10', production: 550, solar: 720 },
    { date: '06.10', production: 580, solar: 760 },
    { date: '07.10', production: 630, solar: 810 },
  ]);

  const [energyStats] = useState([
    { label: 'Toplam Üretim (Bu Ay)', value: '3,820 MWh', change: '+12.5%' },
    { label: 'Ortalama Günlük', value: '546 MWh', change: '+5.3%' },
    { label: 'Pik Üretim', value: '630 MWh', change: '07.10' },
    { label: 'Solar Payı', value: '65%', change: '+8.1%' },
  ]);

  const [energyBySource] = useState([
    { source: 'Solar', value: 2480, percentage: 65 },
    { source: 'Rüzgar', value: 900, percentage: 23 },
    { source: 'Hidrolik', value: 440, percentage: 12 },
  ]);

  return (
    <Layout>
      <div className="p-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Enerji Yönetimi</h1>
          <p className="text-gray-400">Enerji üretim ve tüketim analizi</p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {energyStats.map((stat, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-xs text-green-400">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Enerji Üretim Trendi
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="production" stroke="#0ea5e9" name="Üretim (MWh)" />
                <Line type="monotone" dataKey="solar" stroke="#f59e0b" name="Solar Radyasyon" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Kaynak Tablosu */}
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

        {/* Detaylı Tablo */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="bg-gray-900 p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">Günlük Enerji Verisi</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tarih</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Üretim (MWh)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Solar Radyasyon</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Verimlilik</th>
                </tr>
              </thead>
              <tbody>
                {energyData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="px-6 py-4 text-sm text-white">{row.date}</td>
                    <td className="px-6 py-4 text-sm text-white font-semibold">{row.production}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{row.solar}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900 text-green-200">
                        {((row.production / row.solar) * 100).toFixed(1)}%
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

export default EnergyPage;
