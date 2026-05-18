import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, Settings, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { useTranslation } from '../../hooks/useTranslation';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const theme = useSettingsStore((state) => state.theme);
  const navigate = useNavigate();
  
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const [userName, setUserName] = useState('User');

  const notificationRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Profil bilgisini localStorage'dan yükle
    const loadUserName = () => {
      const savedProfile = localStorage.getItem('profileData');
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          setUserName(`${profile.firstName} ${profile.lastName}`);
        } catch (e) {
          // JSON parse hatası, default olarak User göster
          setUserName('User');
        }
      } else {
        // localStorage'da veri yoksa User göster
        setUserName('User');
      }
    };

    loadUserName();

    // Profil değişikliğini dinle
    const handleProfileUpdate = () => {
      loadUserName();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    // 1. NOKTA KONTROLÜ: Sayfa her yüklendiğinde hafızaya bak
    const isGloballyRead = localStorage.getItem('notificationsReadStatus') === 'true';
    if (isGloballyRead) {
      setHasUnread(false);
    }

    // 2. VERİ ÇEKME VE UNDEFINED HATASI ÇÖZÜMÜ
    const energyData = JSON.parse(localStorage.getItem('importedEnergyData') || '[]');
    const historyNotifications = energyData.map((data: any, index: number) => {
      // Veri içindeki tüketim değerini her türlü ihtimale karşı arıyoruz
      const consumptionVal = data.consumption || data.tuketim || data.tüketim || data.tüketim_mwh || '0';
      
      return {
        id: `energy-${index}`,
        title: Number(data.solar) > 50 ? 'Yüksek Enerji Üretimi' : 'Enerji Verisi Kaydedildi',
        desc: `Solar: %${data.solar} - Tüketim: %${consumptionVal}`,
        time: index === 0 ? 'Az önce' : `${index + 1} dk önce`
      };
    });

    setAllNotifications([...historyNotifications, { id: 'sys-1', title: 'Sistem Güncellemesi', desc: 'Modeller optimize edildi.', time: '1 saat önce' }]);

    // 3. OKUNDU SİNYALİ
    const handleReadSignal = () => {
      setHasUnread(false);
      localStorage.setItem('notificationsReadStatus', 'true');
    };

    window.addEventListener('notificationsRead', handleReadSignal);
    
    return () => {
      window.removeEventListener('notificationsRead', handleReadSignal);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const handleNotificationNavigation = () => {
    setHasUnread(false);
    localStorage.setItem('notificationsReadStatus', 'true');
    setShowNotifications(false);
    navigate('/notifications');
  };

  return (
    <div className={`h-16 border-b flex items-center justify-between px-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Enerji ve Su Yönetimi</h2>

      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationRef}>
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 relative hover:bg-gray-700 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-300" />
            {hasUnread && allNotifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-2xl border z-50 ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
              <div className="p-4 border-b border-gray-600 font-bold text-white">Bildirim Akışı</div>
              
              {/* KAYDIRMA ÇUBUĞUNU ÖLDÜREN KISIM */}
              <div 
                className="max-h-96 overflow-y-auto" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`div::-webkit-scrollbar { display: none !important; }`}</style>
                
                {allNotifications.map((notif) => (
                  <div key={notif.id} onClick={handleNotificationNavigation} className="p-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer">
                    <p className="font-medium text-blue-400 text-sm">{notif.title}</p>
                    <p className="text-xs text-gray-300 mt-0.5">{notif.desc}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <button onClick={handleNotificationNavigation} className="w-full p-3 text-sm text-blue-400 hover:bg-gray-700">Tüm geçmişi gör</button>
            </div>
          )}
        </div>

        <div className="relative" ref={adminRef}>
          <button onClick={() => setShowAdminMenu(!showAdminMenu)} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg">
            <User size={20} className="text-gray-300" />
            <span className="text-sm font-medium text-white">{userName}</span>
          </button>
          {showAdminMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
               <button onClick={() => navigate('/profile')} className="w-full p-3 text-left text-sm text-gray-200 hover:bg-gray-700">Profilim</button>
               <button onClick={() => { 
                 // Profil bilgilerini sakla
                 const profileData = localStorage.getItem('profileData');
                 // localStorage'ı temizle
                 localStorage.clear();
                 // Profil bilgilerini geri yükle
                 if (profileData) {
                   localStorage.setItem('profileData', profileData);
                 }
                 navigate('/login'); 
               }} className="w-full p-3 text-left text-sm text-red-400 hover:bg-red-900/20">Çıkış Yap</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;