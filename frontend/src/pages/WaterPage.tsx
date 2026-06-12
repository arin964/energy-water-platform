import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/common/Layout';
import DamModal, { DamFormData } from '../components/common/DamModal';
import { Droplet, AlertCircle, Trash2, Edit2, Plus } from 'lucide-react';
import { waterService, damService, Dam } from '../services/waterService';

interface WaterData {
  date: string;
  consumption: number;
  damLevel: number;
}

const WaterPage: React.FC = () => {
  const [waterData, setWaterData] = useState<WaterData[]>([]);
  const [dams, setDams] = useState<Dam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [conservationProgram, setConservationProgram] = useState<any>(null);
  const [programLoading, setProgramLoading] = useState(false);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDam, setEditingDam] = useState<Dam | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load water and dam data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch water data (last 7 days from the latest data point)
      const endDate = new Date('2026-05-31T23:59:59Z');
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 6);

      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];

      const water = await waterService.getAll({ startDate: start, endDate: end });
      
      // Format water data
      const formattedWater: WaterData[] = water.map((item: any) => {
        const date = new Date(item.timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return {
          date: `${day}.${month}.${year}`,
          consumption: Math.round(item.consumption),
          damLevel: 70, // Placeholder - could be calculated from dam data
        };
      });

      setWaterData(formattedWater.length > 0 ? formattedWater : generateMockWaterData());

      // Fetch dams data
      const damsData = await damService.getAll();
      setDams(damsData);
    } catch (err) {
      console.error('Veri yükleme hatası:', err);
      setError('Veriler yüklenemedi');
      // Use mock data as fallback
      setWaterData(generateMockWaterData());
      setDams(generateMockDams());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Program durumunu localStorage'dan yükle
    const savedProgram = localStorage.getItem('conservationProgram');
    if (savedProgram) {
      setConservationProgram(JSON.parse(savedProgram));
      // Backend'den de güncel durumunu kontrol et
      fetchConservationStats();
    }
  }, []);

  // Su Tasarruf Programı Başlat
  const handleStartConservationProgram = async () => {
    try {
      setProgramLoading(true);
      const response = await fetch('http://localhost:5000/api/water/conservation-program', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetReduction: 20, // 20% tasarruf hedefi
        }),
      });

      const result = await response.json();

      if (result.success) {
        setConservationProgram(result.program);
        // localStorage'a kaydet
        localStorage.setItem('conservationProgram', JSON.stringify(result.program));
        alert('✓ Su Tasarruf Programı başlatıldı!\n' + result.program.message);
        
        // Programın istatistikleri getir
        fetchConservationStats();
      } else {
        alert('❌ Program başlatılamadı: ' + result.message);
      }
    } catch (err) {
      console.error('Program başlatma hatası:', err);
      alert('❌ Programı başlatırken hata oluştu');
    } finally {
      setProgramLoading(false);
    }
  };

  // Su Tasarruf Programı İstatistikleri Getir
  const fetchConservationStats = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 30);

      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];

      const response = await fetch(
        `http://localhost:5000/api/water/conservation-program?startDate=${start}&endDate=${end}`
      );

      const result = await response.json();

      if (result.success) {
        setConservationProgram(result.program);
        // localStorage'a kaydet
        localStorage.setItem('conservationProgram', JSON.stringify(result.program));
      }
    } catch (err) {
      console.error('Istatistikler getirme hatası:', err);
    }
  };

  const generateMockWaterData = (): WaterData[] => [
    { date: '10.05.2026', consumption: 2350, damLevel: 78 },
    { date: '11.05.2026', consumption: 2410, damLevel: 76 },
    { date: '12.05.2026', consumption: 2280, damLevel: 74 },
    { date: '13.05.2026', consumption: 2520, damLevel: 72 },
    { date: '14.05.2026', consumption: 2390, damLevel: 70 },
    { date: '15.05.2026', consumption: 2450, damLevel: 68 },
    { date: '16.05.2026', consumption: 2610, damLevel: 66 },
  ];

  const generateMockDams = (): Dam[] => [
    {
      id: 1,
      name: 'Baraj 1',
      location: 'İstanbul',
      capacity: 50000,
      currentLevel: 39000,
      fillPercentage: 78,
      inflow: 100,
      outflow: 80,
      timestamp: new Date(),
      latitude: 41.0082,
      longitude: 28.9784,
    },
    {
      id: 2,
      name: 'Baraj 2',
      location: 'Ankara',
      capacity: 75000,
      currentLevel: 48750,
      fillPercentage: 65,
      inflow: 150,
      outflow: 120,
      timestamp: new Date(),
      latitude: 39.9334,
      longitude: 32.8597,
    },
    {
      id: 3,
      name: 'Baraj 3',
      location: 'İzmir',
      capacity: 45000,
      currentLevel: 36900,
      fillPercentage: 82,
      inflow: 120,
      outflow: 100,
      timestamp: new Date(),
      latitude: 38.7169,
      longitude: 35.2241,
    },
  ];

  // Calculate water stats
  const waterStats = [
    { label: 'Günlük Ortalama Tüketim', value: waterData.length > 0 ? `${Math.round(waterData.reduce((sum, item) => sum + item.consumption, 0) / waterData.length)} m³` : '0 m³', change: '+3.2%' },
    { label: 'Baraj Doluluk (Günlük Ort.)', value: dams.length > 0 ? `${Math.round(dams.reduce((sum, dam) => sum + dam.fillPercentage, 0) / dams.length)}%` : '0%', change: '-2.1%' },
    { label: 'Su Reservi (Ton)', value: dams.length > 0 ? `${Math.round(dams.reduce((sum, dam) => sum + dam.currentLevel, 0) / 1000).toLocaleString()}` : '0', change: 'Uygun' },
    { label: 'Tahmini Su Günleri', value: '45 Gün', change: 'Normal' },
  ];

  // Modal handlers
  const handleAddDam = () => {
    setEditingDam(null);
    setIsModalOpen(true);
  };

  const handleEditDam = (dam: Dam) => {
    setEditingDam(dam);
    setIsModalOpen(true);
  };

  const handleDeleteDam = async (id: number) => {
    if (window.confirm('Bu barajı silmek istediğinizden emin misiniz?')) {
      try {
        await damService.delete(id);
        alert('✓ Baraj başarıyla silindi');
        
        // VERİLERİ YENİDEN ÇEK - REFETCH
        await fetchData();
      } catch (err) {
        console.error('Silme hatası:', err);
        alert('❌ Baraj silinirken hata oluştu');
      }
    }
  };

  const handleSubmitDam = async (formData: DamFormData) => {
    try {
      setIsSubmitting(true);
      if (editingDam) {
        // Update existing dam
        const updated = await damService.update(editingDam.id, formData);
        setDams(dams.map(dam => dam.id === editingDam.id ? updated : dam));
      } else {
        // Create new dam
        const created = await damService.create(formData);
        setDams([...dams, created]);
      }
      setIsModalOpen(false);
      setEditingDam(null);
    } catch (err) {
      console.error('Kaydetme hatası:', err);
      alert('Baraj kaydedilirken hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Su Tasarruf Programı Durdur
  const handleStopConservationProgram = async () => {
    if (window.confirm('Su Tasarruf Programını durmak istediğinizden emin misiniz?')) {
      setConservationProgram(null);
      // localStorage'dan kaldır
      localStorage.removeItem('conservationProgram');
      alert('✓ Su Tasarruf Programı durduruldu');
    }
  };

  const lowestDamLevel = dams.length > 0 ? Math.min(...dams.map(d => d.fillPercentage)) : 100;

  return (
    <Layout>
      <div className="p-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Su Yönetimi</h1>
          <p className="text-gray-400">Su tüketimi ve baraj seviyesi takibi</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-900 border border-yellow-700 rounded-lg">
            <p className="text-yellow-200">{error}</p>
          </div>
        )}

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

        {/* Su Tasarruf Programı - Aktif olduğunda yeşil kart, değilse başlat butonu */}
        {conservationProgram ? (
        <div className="mb-8 bg-gradient-to-r from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">🌱 Su Tasarruf Programı</h2>
              <p className="text-green-200">Tabanı 20% azaltarak su tasarrufu sağlayın</p>
            </div>
            <button
              onClick={handleStopConservationProgram}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
            >
              Programı Durdur
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-green-700 bg-opacity-50 rounded p-4">
              <p className="text-green-200 text-sm">Ortalama Tüketim</p>
              <p className="text-2xl font-bold text-white">
                {conservationProgram.avgConsumption || conservationProgram.baselineConsumption} m³
              </p>
            </div>
            <div className="bg-green-700 bg-opacity-50 rounded p-4">
              <p className="text-green-200 text-sm">Hedef Tüketim</p>
              <p className="text-2xl font-bold text-white">
                {conservationProgram.targetConsumption} m³
              </p>
            </div>
            <div className="bg-green-700 bg-opacity-50 rounded p-4">
              <p className="text-green-200 text-sm">Tasarruf Oranı</p>
              <p className="text-2xl font-bold text-green-300">
                %{conservationProgram.savingsPercentage || conservationProgram.targetReductionPercentage}
              </p>
            </div>
          </div>
        </div>
        ) : (
        <div className="mb-4">
          <button
            onClick={handleStartConservationProgram}
            disabled={programLoading}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-semibold transition text-lg"
          >
            {programLoading ? 'Başlatılıyor...' : '🌱 Su Tasarruf Programını Başlat'}
          </button>
        </div>
        )}

        {/* Grafikler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Su Tüketim Grafiği */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-400" />
              Su Tüketim Trendi
            </h2>
            {waterData.length > 0 ? (
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
            ) : (
              <p className="text-gray-400 text-center py-12">Veri yükleniyor...</p>
            )}
          </div>

          {/* Baraj Seviyesi */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4">Baraj Doluluk Seviyesi</h2>
            {waterData.length > 0 ? (
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
            ) : (
              <p className="text-gray-400 text-center py-12">Veri yükleniyor...</p>
            )}
          </div>
        </div>

        {/* Baraj Detayları */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Barajlar</h2>
            <button
              onClick={handleAddDam}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              <Plus size={20} />
              Yeni Baraj Ekle
            </button>
          </div>

          {loading ? (
            <p className="text-gray-400 text-center py-12">Barajlar yükleniyor...</p>
          ) : dams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dams.map((dam) => (
                <div key={dam.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">{dam.name}</h3>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Doluluk Seviyesi</span>
                      <span className="text-white font-semibold">{dam.fillPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${dam.fillPercentage > 70 ? 'bg-green-500' : dam.fillPercentage > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${dam.fillPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Kapasitesi: {dam.capacity.toLocaleString()} m³</p>
                  <p className="text-sm text-gray-400 mt-2">Mevcut: {Math.round(dam.currentLevel).toLocaleString()} m³</p>
                  <p className="text-sm text-gray-400 mt-2">Konum: {dam.location}</p>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => handleEditDam(dam)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-sm"
                    >
                      <Edit2 size={16} />
                      Güncelle
                    </button>
                    <button
                      onClick={() => handleDeleteDam(dam.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition text-sm"
                    >
                      <Trash2 size={16} />
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Henüz baraj eklenmemiş</p>
              <button
                onClick={handleAddDam}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                <Plus size={20} />
                İlk Barajı Ekle
              </button>
            </div>
          )}
        </div>

        {/* Uyarı */}
        {lowestDamLevel < 65 && (
          <div className="bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-lg p-6 flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-200 mb-2">Su Seviyesi Uyarısı</h3>
              <p className="text-yellow-100 text-sm">Baraj seviyelerinde düşüş gözlenmiştir. Su tasarrufu önerilmektedir.</p>
            </div>
          </div>
        )}
      </div>

      {/* Dam Modal */}
      <DamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitDam}
        initialData={editingDam ? {
          ...editingDam,
        } : undefined}
        isLoading={isSubmitting}
        title={editingDam ? 'Barajı Güncelle' : 'Yeni Baraj Ekle'}
      />
    </Layout>
  );
};

export default WaterPage;
