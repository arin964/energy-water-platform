import React, { useState } from 'react';
import Layout from '../components/common/Layout';

interface NotificationItem {
  id: number;
  title: string;
  time: string;
  description: string;
  isRead: boolean;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, title: "Baraj seviyesi %90'ı geçti", time: "2 saat önce", description: "Baraj 1'deki doluluk oranı kritik seviyeye ulaştı. Tahliye sistemleri kontrol edilmelidir.", isRead: false },
    { id: 2, title: "Yeni tahmin modeli güncellendi", time: "5 saat önce", description: "Prophet modeli son 24 saatlik verilerle optimize edildi. Tahmin doğruluk oranı %94.", isRead: false },
    { id: 3, title: "Enerji üretimi bekleninin altında", time: "1 gün önce", description: "Bulutlu hava nedeniyle güneş panellerinden gelen verim %15 oranında azaldı.", isRead: true },
    { id: 4, title: "Sistem Ayarları Değiştirildi", time: "2 gün önce", description: "Admin kullanıcısı tarafından optimizasyon ağırlıkları güncellendi.", isRead: true }
  ]);

  const markAllAsRead = () => {
    // 1. Sayfadaki mavi noktaları kaldır
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);

    // 2. Navbar'daki kırmızı noktayı anında söndür (Sinyal gönder)
    window.dispatchEvent(new CustomEvent('notificationsRead'));
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Bildirim Merkezi</h1>
          <button 
            onClick={markAllAsRead}
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            Tümünü okundu işaretle
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-5 rounded-xl border transition-all ${
                n.isRead ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-800 border-blue-500/50 shadow-lg'
              }`}
            >
              <div className="flex justify-between items-start mb-2 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  {!n.isRead && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>}
                  <h3 className={`font-semibold ${n.isRead ? 'text-gray-400' : 'text-white'}`}>
                    {n.title}
                  </h3>
                </div>
                <span className="text-xs text-gray-500 italic">{n.time}</span>
              </div>
              <p className={`${n.isRead ? 'text-gray-500' : 'text-gray-300'} text-sm leading-relaxed`}>
                {n.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;