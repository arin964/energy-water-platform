import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/common/Layout';
import { TrendingUp, Cloud } from 'lucide-react';

interface ForecastData {
  date: string;
  predicted: number;
  actual: number;
}

const ForecastPage: React.FC = () => {
  const [forecastData] = useState<ForecastData[]>([
    { date: '08.10', predicted: 580, actual: 565 },
    { date: '09.10', predicted: 620, actual: 615 },
    { date: '10.10', predicted: 545, actual: null },
    { date: '11.10', predicted: 590, actual: null },
    { date: '12.10', predicted: 610, actual: null },
    { date: '13.10', predicted: 575, actual: null },
    { date: '14.10', predicted: 640, actual: null },
  ]);

  const [modelAccuracy] = useState([
    { name: 'LSTM Modeli', accuracy: 92.4, mae: 28.5 },
    { name: 'Prophet Modeli', accuracy: 88.7, mae: 42.3 },
    { name: 'XGBoost Modeli', accuracy: 91.2, mae: 35.6 },
  ]);

  const [nextDayForecast] = useState({
    date: '08.10.2025',
    energyProduction: 580,
    waterConsumption: 2650,
    damLevel: 64,
    confidence: 94,
  });

  return (
    <Layout>
      <div className="p-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tahmini Analizler</h1>
          <p className="text-gray-400">Makine öğrenmesi modelleriyle yapılan tahminler</p>
        </div>

        {/* Ertesi Gün Tahmini */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <p className="text-blue-200 text-sm mb-2">Ertesi Gün Enerji Üretimi</p>
            <p className="text-4xl font-bold text-white mb-2">{nextDayForecast.energyProduction} MWh</p>
            <p className="text-xs text-blue-200">{nextDayForecast.date}</p>
          </div>
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <p className="text-green-200 text-sm mb-2">Tahmini Su Tüketimi</p>
            <p className="text-4xl font-bold text-white mb-2">{nextDayForecast.waterConsumption} m³</p>
            <p className="text-xs text-green-200">{nextDayForecast.date}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-lg p-6 border border-yellow-700">
            <p className="text-yellow-200 text-sm mb-2">Baraj Seviyesi (Beklenen)</p>
            <p className="text-4xl font-bold text-white mb-2">{nextDayForecast.damLevel}%</p>
            <p className="text-xs text-yellow-200">{nextDayForecast.date}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
            <p className="text-purple-200 text-sm mb-2">Model Güven Düzeyi</p>
            <p className="text-4xl font-bold text-white mb-2">{nextDayForecast.confidence}%</p>
            <p className="text-xs text-purple-200">Tahmin Güvenilirliği</p>
          </div>
        </div>

        {/* Tahmin Grafiği */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Enerji Üretim Tahmini
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="predicted" stroke="#0ea5e9" name="Tahmin" strokeWidth={2} />
              <Line type="monotone" dataKey="actual" stroke="#10b981" name="Gerçek Veriler" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Model Performansı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modelAccuracy.map((model, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">{model.name}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Doğruluk</span>
                    <span className="text-white font-semibold">{model.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${model.accuracy}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Ortalama Hata (MAE)</p>
                  <p className="text-2xl font-bold text-white mt-1">{model.mae}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ForecastPage;
