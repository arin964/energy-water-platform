import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X, Clock } from 'lucide-react';

interface Alert {
  id: number;
  başlık: string;
  açıklama: string;
  seviye: 'critical' | 'warning' | 'info';
  zaman: string;
  durum: 'aktif' | 'çözüldü' | 'bekleme';
}

const AlertsPage: React.FC = () => {
  const [alerts] = useState<Alert[]>([
    {
      id: 1,
      başlık: 'Kritik: Baraj Seviyesi Düşük',
      açıklama: 'Baraj su seviyesi %20 altına düşme riski var. Derhal su tasarrufu önlemleri alınması gerekiyor.',
      seviye: 'critical',
      zaman: '5 dakika önce',
      durum: 'aktif',
    },
    {
      id: 2,
      başlık: 'Uyarı: Enerji Üretimi Beklenenin Altında',
      açıklama: 'Güneş radyasyonunun az olması nedeniyle solar üretim %15 düşmüştür. Normal seviyelere dönüş beklenmektedir.',
      seviye: 'warning',
      zaman: '45 dakika önce',
      durum: 'aktif',
    },
    {
      id: 3,
      başlık: 'Bilgi: Bakım Planı Zamanlandı',
      açıklama: 'Perşembe günü 02:00-04:00 saatleri arasında sistem bakımı yapılacaktır.',
      seviye: 'info',
      zaman: '2 saat önce',
      durum: 'bekleme',
    },
    {
      id: 4,
      başlık: 'Uyarı: Su Basınçı Anormal',
      açıklama: 'Boru hattında basınç düşüşü tespit edilmiştir. Kaçak kontrolü yapılması önerilir.',
      seviye: 'warning',
      zaman: '3 saat önce',
      durum: 'aktif',
    },
    {
      id: 5,
      başlık: 'Çözüldü: Sensor Hatası Giderildi',
      açıklama: 'D-3 sensöründe tespit edilen arıza tamamen çözülmüştür. Veri akışı normal duruma döndü.',
      seviye: 'info',
      zaman: '1 gün önce',
      durum: 'çözüldü',
    },
    {
      id: 6,
      başlık: 'Kritik: Şebeke Gerilimi Yüksek',
      açıklama: 'Elektrik şebekesi gerilimi %5 üzerinde. Trafo eklenebilir veya yük azaltılabilir.',
      seviye: 'critical',
      zaman: '2 gün önce',
      durum: 'çözüldü',
    },
  ]);

  const getAyakÖnü = (seviye: string) => {
    switch (seviye) {
      case 'critical':
        return 'bg-red-900 bg-opacity-20 border-red-700';
      case 'warning':
        return 'bg-yellow-900 bg-opacity-20 border-yellow-700';
      case 'info':
        return 'bg-blue-900 bg-opacity-20 border-blue-700';
      default:
        return 'bg-gray-800 border-gray-700';
    }
  };

  const getİcon = (seviye: string) => {
    switch (seviye) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getDurumuBadge = (durum: string) => {
    switch (durum) {
      case 'aktif':
        return 'bg-red-900 text-red-200';
      case 'çözüldü':
        return 'bg-green-900 text-green-200';
      case 'bekleme':
        return 'bg-yellow-900 text-yellow-200';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };

  const aktivUyarılar = alerts.filter((a) => a.durum === 'aktif');
  const çözülenUyarılar = alerts.filter((a) => a.durum === 'çözüldü');
  const beklemeUyarıları = alerts.filter((a) => a.durum === 'bekleme');

  return (
    <Layout>
      <div className="p-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Uyarılar & Bildirimler</h1>
          <p className="text-gray-400">Sistem uyarıları ve durumu</p>
        </div>

        {/* Özet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300 text-sm font-medium">Aktif Uyarılar</p>
                <p className="text-4xl font-bold text-red-200 mt-2">{aktivUyarılar.length}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-500 opacity-50" />
            </div>
          </div>

          <div className="bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300 text-sm font-medium">Bekleme Durumu</p>
                <p className="text-4xl font-bold text-yellow-200 mt-2">{beklemeUyarıları.length}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-500 opacity-50" />
            </div>
          </div>

          <div className="bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Çözülen Uyarılar</p>
                <p className="text-4xl font-bold text-green-200 mt-2">{çözülenUyarılar.length}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Aktif Uyarılar */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">🔴 Aktif Uyarılar</h2>
          <div className="space-y-4">
            {aktivUyarılar.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg p-6 border ${getAyakÖnü(alert.seviye)} transition-all hover:shadow-lg`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="mt-1">{getİcon(alert.seviye)}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{alert.başlık}</h3>
                      <p className="text-gray-300 mb-3">{alert.açıklama}</p>
                      <p className="text-xs text-gray-400">{alert.zaman}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bekleme Durumundaki Uyarılar */}
        {beklemeUyarıları.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">⏱️ Bekleme Durumu</h2>
            <div className="space-y-4">
              {beklemeUyarıları.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-lg p-6 border ${getAyakÖnü(alert.seviye)} transition-all hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="mt-1">{getİcon(alert.seviye)}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{alert.başlık}</h3>
                        <p className="text-gray-300 mb-3">{alert.açıklama}</p>
                        <p className="text-xs text-gray-400">{alert.zaman}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Çözülen Uyarılar */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">✅ Çözülen Uyarılar</h2>
          <div className="space-y-4">
            {çözülenUyarılar.map((alert) => (
              <div
                key={alert.id}
                className="rounded-lg p-6 border border-gray-700 bg-gray-800 bg-opacity-50 transition-all hover:shadow-lg opacity-75"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-300 mb-1 line-through">{alert.başlık}</h3>
                      <p className="text-gray-400 mb-3">{alert.açıklama}</p>
                      <p className="text-xs text-gray-500">{alert.zaman}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDurumuBadge(alert.durum)}`}>
                    Çözüldü
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlertsPage;
