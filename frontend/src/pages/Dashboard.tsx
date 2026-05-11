import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import EnergyChart from '../components/charts/EnergyChart';
import { Zap, Droplet, TrendingUp, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Uyarıların ne zaman oluşturulduğunu tutan mock veriler (Gerçek projede API'den gelecektir)
  const [alerts, setAlerts] = useState([
    { 
      type: 'warning', 
      message: 'Baraj seviyesi %20 altına düşebilir', 
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 saat önce
    },
    { 
      type: 'info', 
      message: 'Yeni tahmin modeli güncellendi', 
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 saat önce
    },
    { 
      type: 'critical', 
      message: 'Enerji üretimi beklenenin altında', 
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 gün önce
    },
  ]);

  // Zamanın her dakika otomatik güncellenmesi için state tetikleyici
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000); // Her 60 saniyede bir arayüzü tazeler

    return () => clearInterval(timer);
  }, []);

  const mockChartData = [
    { date: '01.01', energy: 45, solar: 650 },
    { date: '02.01', energy: 52, solar: 700 },
    { date: '03.01', energy: 48, solar: 680 },
    { date: '04.01', energy: 61, solar: 750 },
    { date: '05.01', energy: 55, solar: 720 },
    { date: '06.01', energy: 58, solar: 740 },
    { date: '07.01', energy: 63, solar: 780 },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card
              title="Toplam Enerji Üretimi"
              value="1,234 MWh"
              icon={Zap}
              color="blue"
              trend={{ value: 12.5, isPositive: true }}
              onClick={() => navigate('/energy')}
            />
            <Card
              title="Su Tüketimi"
              value="45,678 m³"
              icon={Droplet}
              color="green"
              trend={{ value: 8.2, isPositive: false }}
              onClick={() => navigate('/water')}
            />
            <Card
              title="Baraj Doluluk"
              value="78%"
              icon={TrendingUp}
              color="yellow"
              trend={{ value: 5.1, isPositive: true }}
              onClick={() => navigate('/water')}
            />
            <Card
              title="Aktif Uyarılar"
              value="3"
              icon={AlertTriangle}
              color="red"
              onClick={() => navigate('/alerts')}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnergyChart data={mockChartData} />
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Son Uyarılar
              </h3>
              
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'critical' ? 'bg-red-500' :
                      alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 dark:text-white">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(alert.timestamp, { addSuffix: true, locale: tr })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;