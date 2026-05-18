import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import EnergyChart from '../components/charts/EnergyChart';
import { Zap, Droplet, TrendingUp, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { energyService } from '../services/energyService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);

  // Zamanın her dakika otomatik güncellenmesi için state tetikleyici
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000); // Her 60 saniyede bir arayüzü tazeler

    return () => clearInterval(timer);
  }, []);

  // API'den aktif uyarıları çek
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoadingAlerts(true);
        const response = await fetch('http://localhost:5000/api/alerts/active');
        const result = await response.json();
        
        if (result.success && result.data) {
          setAlerts(result.data);
        } else {
          // Fallback: mock data
          setAlerts([
            { 
              type: 'warning', 
              message: 'Baraj seviyesi %20 altına düşebilir', 
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              severity: 6
            },
          ]);
        }
      } catch (error) {
        console.error('Uyarılar çekilirken hata:', error);
      } finally {
        setLoadingAlerts(false);
      }
    };

    fetchAlerts();
    
    // Her 5 dakikada bir alertleri yeniden çek
    const alertInterval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(alertInterval);
  }, []);

  // API'den 7 günlük enerji verisini çek
  useEffect(() => {
    const fetchEnergyData = async () => {
      try {
        setLoadingChart(true);

        // Son 7 günün tarihini hesapla
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 6); // 7 gün (bugün dahil)

        // Tarih formatı: YYYY-MM-DD
        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];

        // API'den veri çek
        const data = await energyService.getAll({ startDate: start, endDate: end });

        // Veriyi grafik için uygun formata dönüştür
        const formattedData = data.map((item: any) => {
          const date = new Date(item.timestamp);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          
          return {
            date: `${day}.${month}.${year}`,
            energy: Math.round(item.energyProduced),
            solar: Math.round(item.solarRadiation),
          };
        });

        setChartData(formattedData);
      } catch (err) {
        console.error('Enerji verisi çekilirken hata:', err);
        // Fallback verisi ayarla
        setChartData([
          { date: '08.05.2026', energy: 45, solar: 650 },
          { date: '09.05.2026', energy: 52, solar: 700 },
          { date: '10.05.2026', energy: 48, solar: 680 },
          { date: '11.05.2026', energy: 61, solar: 750 },
          { date: '12.05.2026', energy: 55, solar: 720 },
          { date: '13.05.2026', energy: 58, solar: 740 },
          { date: '14.05.2026', energy: 63, solar: 780 },
        ]);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchEnergyData();
  }, []);

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
            <EnergyChart data={chartData} />
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Son Uyarılar
              </h3>
              
              <div className="space-y-3">
                {alerts.map((alert, index) => {
                  // Timestamp'i valid bir tarih nesnesine dönüştür
                  const alertDate = alert.timestamp 
                    ? new Date(alert.timestamp) 
                    : new Date();
                  
                  // Geçersiz tarihler için kontrol
                  const isValidDate = !isNaN(alertDate.getTime());
                  
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'critical' ? 'bg-red-500' :
                        alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 dark:text-white">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {isValidDate 
                            ? formatDistanceToNow(alertDate, { addSuffix: true, locale: tr })
                            : 'Zaman bilgisi yok'
                          }
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;