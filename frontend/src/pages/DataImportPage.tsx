import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import { Upload, Plus, FileText, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';

interface EnergyDataInput {
  tarih: string;
  saat: string;
  konum: string;
  uretim: number | string;
  tuketim: number | string;
  solar: number | string;
  ruzgar: number | string;
}

const DataImportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'csv' | 'manual'>('csv');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [importedData, setImportedData] = useState<any[]>([]);

  // 1. Manuel Giriş: Başlangıçta boş değerler (placeholder görünecek)
  const emptyForm: EnergyDataInput = {
    tarih: '',
    saat: '',
    konum: '',
    uretim: '',
    tuketim: '',
    solar: '',
    ruzgar: '',
  };

  const [manualData, setManualData] = useState<EnergyDataInput>(emptyForm);
  const [customLocation, setCustomLocation] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan mevcut verileri çek
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('importedEnergyData') || '[]');
    setImportedData(savedData);
  }, []);

  // CSV/Excel Dosya Seçimi ve Filtreleme
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedExtensions = /(\.csv|\.xlsx|\.xls)$/i;
      if (!allowedExtensions.exec(file.name)) {
        setUploadStatus('error');
        setUploadMessage('Sadece .csv, .xlsx ve .xls formatları kabul edilir.');
        setCsvFile(null);
        e.target.value = ''; // Inputu temizle
        return;
      }
      setCsvFile(file);
      setUploadStatus('idle');
    }
  };

  const handleCSVSubmit = () => {
    if (!csvFile) return;
    setUploadStatus('success');
    setUploadMessage(`✅ ${csvFile.name} başarıyla yüklendi!`);
    setCsvFile(null);
    setTimeout(() => setUploadStatus('idle'), 5000);
  };

  // Manuel Veri Girişi Değişiklik Yönetimi
  const handleManualInputChange = (field: keyof EnergyDataInput, value: any) => {
    setManualData((prev) => ({ ...prev, [field]: value }));
  };

  const handleManualSubmit = async () => {
    // Basit kontrol: Boş alan bırakılmasın
    if (!manualData.tarih || !manualData.konum || manualData.uretim === '') {
      setUploadStatus('error');
      setUploadMessage('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    try {
      // Veriler 3 kaydda veritabanına kaydedilecek (SOLAR / WIND / HYDRO)
      const baseData = {
        timestamp: `${manualData.tarih}T${manualData.saat || '12:00'}:00Z`,
        location: manualData.konum,
        latitude: 39.5, // Varsayılan
        longitude: 35,  // Varsayılan
      };

      // 3 kayıt oluştur: SOLAR, WIND, HYDRO
      const energyRecords = [
        {
          ...baseData,
          source: 'Solar',
          energyProduced: parseFloat(manualData.solar as string) || 0,
          solarRadiation: parseFloat(manualData.solar as string) || 0,
          temperature: 20,
          humidity: 50,
        },
        {
          ...baseData,
          source: 'Wind',
          energyProduced: parseFloat(manualData.ruzgar as string) || 0,
          windSpeed: 5,
          temperature: 20,
          humidity: 50,
        },
        {
          ...baseData,
          source: 'Hydro',
          energyProduced: parseFloat(manualData.uretim as string) - (parseFloat(manualData.solar as string) || 0) - (parseFloat(manualData.ruzgar as string) || 0) || 0,
          temperature: 20,
          humidity: 50,
        },
      ];

      console.log('📤 Gönderilen veriler:', energyRecords);

      // API'ye POST et (her kayıt ayrı)
      let successCount = 0;
      for (const record of energyRecords) {
        try {
          const response = await fetch('http://localhost:5000/api/energy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record),
          });

          console.log(`📊 ${record.source} yanıt:`, response.status, response.statusText);

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`${record.source} hatası:`, errorText);
          } else {
            successCount++;
          }
        } catch (fetchError) {
          console.error(`${record.source} gönderme hatası:`, fetchError);
        }
      }

      if (successCount > 0) {
        // localStorage'a da kaydet (eski sistem uyumu)
        const newData = { ...manualData, id: Date.now() };
        const updatedList = [newData, ...importedData];
        localStorage.setItem('importedEnergyData', JSON.stringify(updatedList));
        setImportedData(updatedList);

        setUploadStatus('success');
        setUploadMessage(`✅ ${successCount}/3 veri başarıyla veritabanına kaydedildi. Enerji sayfasını yenileyerek görebilirsiniz.`);
        
        // Formu sıfırla
        setManualData(emptyForm);
        setTimeout(() => setUploadStatus('idle'), 5000);
      } else {
        throw new Error('Hiçbir veri kaydedilemedi. Lütfen backend sunucusunun çalışıp çalışmadığını kontrol edin.');
      }
    } catch (error) {
      setUploadStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Bilinmeyen hata';
      setUploadMessage(`❌ Hata: ${errorMsg}`);
      console.error('❌ Tam hata:', error);
      setTimeout(() => setUploadStatus('idle'), 5000);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('importedEnergyData');
    setImportedData([]);
  };

  return (
    <Layout>
      <div className="p-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Veri Yönetimi</h1>
          <p className="text-gray-400 font-medium">Nexus yapay zeka modellerini yeni verilerle besleyin</p>
        </div>

        {/* Durum Bildirimleri */}
        {uploadStatus !== 'idle' && (
          <div className={`mb-6 border rounded-lg p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
            uploadStatus === 'success' ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700'
          }`}>
            {uploadStatus === 'success' ? <CheckCircle className="text-green-400" /> : <AlertCircle className="text-red-400" />}
            <p className={uploadStatus === 'success' ? 'text-green-200' : 'text-red-200'}>{uploadMessage}</p>
          </div>
        )}

        {/* Tab Menü */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('csv')} className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activeTab === 'csv' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            <FileText size={20} /> CSV / Excel
          </button>
          <button onClick={() => setActiveTab('manual')} className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activeTab === 'manual' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            <Plus size={20} /> Manuel Veri Ekle
          </button>
        </div>

        {activeTab === 'csv' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#111827] rounded-3xl border-2 border-dashed border-gray-700 p-12 text-center group hover:border-blue-500/50 transition-colors">
                <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4 group-hover:text-blue-400 transition-colors" />
                <h3 className="text-xl font-bold text-white mb-2">Dosya Yükleme Paneli</h3>
                <p className="text-gray-500 mb-6 text-sm italic">Sadece .csv, .xlsx ve .xls dosyaları desteklenir.</p>

                <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleFileUpload} className="hidden" id="csvInput" />
                <label htmlFor="csvInput" className="inline-block px-8 py-3 bg-white text-black font-bold rounded-xl cursor-pointer hover:bg-blue-50 transition-all shadow-xl">
                  Dosyaları Seçin
                </label>

                {csvFile && (
                  <div className="mt-6 p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                    <p className="text-blue-400 text-sm font-semibold italic">📍 Seçili: {csvFile.name}</p>
                    <button onClick={handleCSVSubmit} className="mt-4 w-full py-2 bg-blue-600 rounded-lg text-white font-bold">Yüklemeyi Tamamla</button>
                  </div>
                )}
            </div>

            <div className="bg-[#111827] rounded-3xl border border-white/5 p-8">
                <h3 className="text-lg font-bold text-white mb-6">Standart Veri Formatı</h3>
                <div className="bg-black/40 rounded-xl p-4 mb-6 font-mono text-[11px] text-blue-300">
                    tarih,saat,konum,uretim,tuketim,solar,ruzgar<br/>
                    2026-05-11,14:00,Istanbul,1200,980,650,550
                </div>
                <div className="space-y-3 opacity-70">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Veri Kuralları</p>
                    <ul className="text-sm text-gray-400 space-y-2 italic">
                        <li>• Sayısal veriler ondalık ise nokta (.) kullanın.</li>
                        <li>• Konum isimleri veritabanındakiyle eşleşmelidir.</li>
                    </ul>
                </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#111827] rounded-3xl border border-white/5 p-8">
            <h3 className="text-xl font-bold text-white mb-8">Yeni Veri Formu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tarih Seçimi</label>
                  <input type="date" value={manualData.tarih} onChange={(e) => handleManualInputChange('tarih', e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Saat</label>
                  <input type="time" value={manualData.saat} onChange={(e) => handleManualInputChange('saat', e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tesis / Konum</label>
                  <div className="flex gap-2">
                    {!customLocation ? (
                      <select value={manualData.konum} onChange={(e) => handleManualInputChange('konum', e.target.value)} className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none">
                        <option value="">Seçiniz...</option>
                        <option>İstanbul Santral</option>
                        <option>Ankara Tesisi</option>
                        <option>İzmir Santral</option>
                        <option>Bursa Elektrik</option>
                        <option>Gaziantep Enerji</option>
                        <option>Konya Tesisi</option>
                        <option>Adana Santral</option>
                        <option>Mersin Enerji</option>
                        <option>Antalya Tesisi</option>
                        <option>Kayseri Santral</option>
                      </select>
                    ) : (
                      <input type="text" placeholder="Tesis adını yazın..." value={manualData.konum} onChange={(e) => handleManualInputChange('konum', e.target.value)} className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" />
                    )}
                    <button onClick={() => setCustomLocation(!customLocation)} className="px-4 py-3 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-blue-300 rounded-xl transition-all font-semibold text-sm">
                      {customLocation ? 'Liste' : 'Özel'}
                    </button>
                  </div>
                </div>
                {['uretim', 'tuketim', 'solar', 'ruzgar'].map((field) => (
                    <div key={field}>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{field.replace('u','ü').toUpperCase()} (MWh)</label>
                        <input type="number" placeholder="0.00" value={manualData[field as keyof EnergyDataInput]} onChange={(e) => handleManualInputChange(field as any, e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" />
                    </div>
                ))}
            </div>
            <button onClick={handleManualSubmit} className="mt-10 px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-green-900/20 active:scale-95">
                <Plus size={20} /> Veriyi Sisteme Kaydet
            </button>
          </div>
        )}

        {/* Kayıt Geçmişi - Dinamik */}
        <div className="mt-12 bg-[#111827] rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h3 className="text-lg font-bold text-white">💾 Son Girilen Kayıtlar</h3>
            <button onClick={clearHistory} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
                <Trash2 size={14} /> Geçmişi Temizle
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/20">
                <tr>
                  {['Tarih', 'Saat', 'Konum', 'Üretim', 'Tüketim', 'Solar'].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {importedData.length > 0 ? importedData.map((row) => (
                  <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium">{row.tarih}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{row.saat}</td>
                    <td className="px-6 py-4 text-sm text-blue-400 font-bold">{row.konum}</td>
                    <td className="px-6 py-4 text-sm text-yellow-400 font-bold">{row.uretim} MWh</td>
                    <td className="px-6 py-4 text-sm text-cyan-400 font-bold">{row.tuketim} MWh</td>
                    <td className="px-6 py-4 text-sm text-orange-400">{row.solar}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-600 italic">Henüz bir veri girişi yapılmadı.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataImportPage;