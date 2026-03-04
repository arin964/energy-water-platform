import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/common/Layout';
import { Droplet, AlertCircle } from 'lucide-react';

interface WaterData {
  date: string;
  consumption: number;
  damLevel: number;
}

const WaterPage: React.FC = () => {
  const [waterData] = useState<WaterData[]>([
    { date: '01.10', consumption: 2350, damLevel: 78 },
    { date: '02.10', consumption: 2410, damLevel: 76 },
    { date: '03.10', consumption: 2280, damLevel: 74 },
    { date: '04.10', consumption: 2520, damLevel: 72 },
    { date: '05.10', consumption: 2390, damLevel: 70 },
    { date: '06.10', consumption: 2450, damLevel: 68 },
    { date: '07.10', consumption: 2610, damLevel: 66 },
  ]);

  const [waterStats] = useState([
    { label: 'Günlük Ortalama Tüketim', value: '2,430 m³', change: '+3.2%' },
    { label: 'Baraj Doluluk (Günlük Ort.)', value: '71%', change: '-2.1%' },
    { label: 'Su Reservi (Ton)', value: '156,400', change: 'Uygun' },
    { label: 'Tahmini Su Günleri', value: '45 Gün', change: 'Normal' },
  ]);

  const [damInfo] = useState([
    { name: 'Baraj 1', level: 78, capacity: 50000 },
    { name: 'Baraj 2', level: 65, capacity: 75000 },
    { name: 'Baraj 3', level: 82, capacity: 45000 },
  ]);

  return (
    <Layout>
      <div className="p-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Su Yönetimi</h1>
          <p className="text-gray-400">Su tüketimi ve baraj seviyesi takibi</p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {waterStats.map((stat, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-xs text-blue-400">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Grafikler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Su Tüketim Grafiği */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-400" />
              Su Tüketim Trendi
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="consumption" stroke="#0ea5e9" name="Tüketim (m³)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Baraj Seviyesi */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4">Baraj Doluluk Seviyesi</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="damLevel" fill="#10b981" name="Doluluk (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Baraj Detayları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {damInfo.map((dam, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">{dam.name}</h3>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Doluluk Seviyesi</span>
                  <span className="text-white font-semibold">{dam.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${dam.level > 70 ? 'bg-green-500' : dam.level > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${dam.level}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-400">Kapasitesi: {dam.capacity.toLocaleString()} m³</p>
              <p className="text-sm text-gray-400 mt-2">Mevcut: {Math.round((dam.capacity * dam.level) / 100).toLocaleString()} m³</p>
            </div>
          ))}
        </div>

        {/* Uyarı */}
        {waterData[waterData.length - 1].damLevel < 65 && (
          <div className="bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-lg p-6 flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-200 mb-2">Su Seviyesi Uyarısı</h3>
              <p className="text-yellow-100 text-sm">Baraj seviyelerinde düşüş gözlenmiştir. Su tasarrufu önerilmektedir.</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WaterPage;
