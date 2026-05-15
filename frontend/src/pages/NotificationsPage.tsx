import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';

interface NotificationItem {
  id: string | number;
  title: string;
  time: string;
  description: string;
  isRead: boolean;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    // GÖREV 15: Geçmiş verileri ve OKUNDU durumunu çek
    const energyData = JSON.parse(localStorage.getItem('importedEnergyData') || '[]');
    const waterData = JSON.parse(localStorage.getItem('importedWaterData') || '[]');
    const isGloballyRead = localStorage.getItem('notificationsReadStatus') === 'true';

    // Enerji verilerinden bildirim oluştur (undefined hatası için data.consumption || data.tuketim kontrolü eklendi)
    const energyNotifs = energyData.map((data: any, index: number) => ({
      id: `energy-${index}`,
      title: Number(data.solar) > 50 ? "Yüksek Enerji Üretimi Algılandı" : "Enerji Verisi Kaydedildi",
      time: index === 0 ? "Az önce" : `${index + 1} dakika önce`,
      description: `Sisteme yeni enerji verileri girildi: Solar üretim %${data.solar}, Tüketim %${data.consumption || data.tuketim || data.tüketim || '0'}. Optimizasyon modelleri bu veriye göre güncellendi.`,
      isRead: isGloballyRead // Hafızadaki duruma göre işaretle
    }));

    // Su verilerinden bildirim oluştur
    const waterNotifs = waterData.map((data: any, index: number) => ({
      id: `water-${index}`,
      title: "Su Tüketim Analizi",
      time: index === 0 ? "Az önce" : `${index + 2} dakika önce`,
      description: `Yeni su tüketim verisi işlendi: Tüketim miktarı %${data.consumption || data.tuketim || data.tüketim || '0'}. Baraj doluluk tahminleri revize ediliyor.`,
      isRead: isGloballyRead
    }));

    const systemNotifs = [
      { id: 'sys-1', title: "Sistem Modeli Güncellendi", time: "1 saat önce", description: "Hava durumuna bağlı tahminleme yapan Prophet modeli son verilerle optimize edildi.", isRead: true },
      { id: 'sys-2', title: "Admin Girişi Yapıldı", time: "3 saat önce", description: "Merve Polat tarafından sistem ayarları kontrol edildi.", isRead: true }
    ];

    setNotifications([...energyNotifs, ...waterNotifs, ...systemNotifs]);
  }, []);

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);

    // KALICI ÇÖZÜM: Okundu bilgisini hafızaya işle ve Navbar'ı uyar
    localStorage.setItem('notificationsReadStatus', 'true');
    window.dispatchEvent(new CustomEvent('notificationsRead'));
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Bildirim Merkezi</h1>
            <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-500/30">
              {notifications.filter(n => !n.isRead).length} Yeni
            </span>
          </div>
          <button 
            onClick={markAllAsRead}
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            Tümünü okundu işaretle
          </button>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div 
                key={n.id} 
                className={`p-5 rounded-xl border transition-all ${
                  n.isRead ? 'bg-gray-800/30 border-gray-700/50 shadow-none' : 'bg-gray-800 border-blue-500/30 shadow-lg shadow-blue-500/5'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {!n.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>}
                    <h3 className={`font-semibold ${n.isRead ? 'text-gray-400' : 'text-blue-100'}`}>
                      {n.title}
                    </h3>
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{n.time}</span>
                </div>
                <p className={`${n.isRead ? 'text-gray-500' : 'text-gray-300'} text-sm leading-relaxed`}>
                  {n.description}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500 border border-dashed border-gray-700 rounded-xl">
              Görüntülenecek bildirim bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;