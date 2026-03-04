import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { Upload, Plus, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface EnergyDataInput {
  tarih: string;
  saat: string;
  konum: string;
  uretim: number;
  tuketim: number;
  solar: number;
  ruzgar: number;
}

const DataImportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'csv' | 'manual'>('csv');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const [manualData, setManualData] = useState<EnergyDataInput>({
    tarih: '2025-10-15',
    saat: '14:30',
    konum: 'İstanbul Santral',
    uretim: 1200,
    tuketim: 980,
    solar: 650,
    ruzgar: 550,
  });

  // CSV Yükleme
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      setUploadStatus('idle');
    }
  };

  const handleCSVSubmit = () => {
    if (!csvFile) {
      setUploadStatus('error');
      setUploadMessage('Lütfen bir dosya seçiniz');
      return;
    }

    // Simüle edilen yükleme
    setUploadStatus('success');
    setUploadMessage(`✅ ${csvFile.name} başarıyla yüklendi! (${Math.floor(Math.random() * 50) + 10} satır işlendi)`);
    setCsvFile(null);

    setTimeout(() => setUploadStatus('idle'), 5000);
  };

  // Manual Veri Girişi
  const handleManualInputChange = (field: keyof EnergyDataInput, value: any) => {
    setManualData((prev) => ({ ...prev, [field]: value }));
  };

  const handleManualSubmit = () => {
    setUploadStatus('success');
    setUploadMessage('✅ Veriler başarıyla kaydedildi!');
    
    // Veriyi localStorage'a kaydet
    const existingData = JSON.parse(localStorage.getItem('importedEnergyData') || '[]');
    existingData.push({ ...manualData, id: Date.now() });
    localStorage.setItem('importedEnergyData', JSON.stringify(existingData));

    // Formu sıfırla
    setManualData({
      tarih: '2025-10-15',
      saat: '14:30',
      konum: 'İstanbul Santral',
      uretim: 1200,
      tuketim: 980,
      solar: 650,
      ruzgar: 550,
    });

    setTimeout(() => setUploadStatus('idle'), 3000);
  };

  return (
    <Layout>
      <div className="p-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Veri Yönetimi</h1>
          <p className="text-gray-400">Yeni enerji ve su tüketimi verilerini sisteme ekleyin</p>
        </div>

        {/* Başarı/Hata Mesajı */}
        {uploadStatus === 'success' && (
          <div className="mb-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-200">{uploadMessage}</p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mb-6 bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200">{uploadMessage}</p>
          </div>
        )}

        {/* Tab Butonları */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('csv')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'csv'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            CSV/Excel Yükleme
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'manual'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Plus className="w-5 h-5" />
            Manuel Giriş
          </button>
        </div>

        {/* CSV Yükleme Bölümü */}
        {activeTab === 'csv' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Yükleme Alanı */}
            <div className="bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 p-12">
              <div className="text-center">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">CSV Dosya Yükleyin</h3>
                <p className="text-gray-400 mb-6">Drag & drop veya seçim yapın</p>

                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csvInput"
                />
                <label
                  htmlFor="csvInput"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors"
                >
                  Dosya Seç
                </label>

                {csvFile && (
                  <div className="mt-6 p-4 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg">
                    <p className="text-green-200 text-sm">✅ {csvFile.name}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Örnek Format */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
              <h3 className="text-xl font-bold text-white mb-6">CSV Formatı Örneği</h3>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-xs text-gray-300">
{`tarih,saat,konum,uretim,tuketim,solar,ruzgar
2025-10-15,14:30,İstanbul Santral,1200,980,650,550
2025-10-15,15:00,İstanbul Santral,1250,1010,680,570
2025-10-15,15:30,Ankara Tesisi,1180,950,620,560
2025-10-16,08:00,İzmir Santral,850,720,400,450`}
                </pre>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-300 mb-2">📋 Gerekli Sütunlar:</p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• <strong>tarih</strong>: YYYY-MM-DD formatında</li>
                    <li>• <strong>saat</strong>: HH:MM formatında</li>
                    <li>• <strong>konum</strong>: Tesis/Santral adı</li>
                    <li>• <strong>uretim</strong>: MWh cinsinden sayı</li>
                    <li>• <strong>tuketim</strong>: MWh cinsinden sayı</li>
                    <li>• <strong>solar</strong>: Solar radyasyon</li>
                    <li>• <strong>ruzgar</strong>: Rüzgar üretimi</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleCSVSubmit}
                disabled={!csvFile}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                Yükle
              </button>
            </div>
          </div>
        )}

        {/* Manuel Giriş Bölümü */}
        {activeTab === 'manual' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
              <h3 className="text-xl font-bold text-white mb-6">Yeni Veri Girişi</h3>

              <div className="space-y-6">
                {/* Tarih */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tarih</label>
                  <input
                    type="date"
                    value={manualData.tarih}
                    onChange={(e) => handleManualInputChange('tarih', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Saat */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Saat (HH:MM)</label>
                  <input
                    type="time"
                    value={manualData.saat}
                    onChange={(e) => handleManualInputChange('saat', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Konum */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Konum/Tesis Adı</label>
                  <select
                    value={manualData.konum}
                    onChange={(e) => handleManualInputChange('konum', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option>İstanbul Santral</option>
                    <option>Ankara Tesisi</option>
                    <option>İzmir Santral</option>
                    <option>Bursa Enerji</option>
                  </select>
                </div>

                {/* Enerji Üretimi */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Enerji Üretimi (MWh)</label>
                  <input
                    type="number"
                    value={manualData.uretim}
                    onChange={(e) => handleManualInputChange('uretim', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Enerji Tüketimi */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Enerji Tüketimi (MWh)</label>
                  <input
                    type="number"
                    value={manualData.tuketim}
                    onChange={(e) => handleManualInputChange('tuketim', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Solar */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Solar Radyasyon</label>
                  <input
                    type="number"
                    value={manualData.solar}
                    onChange={(e) => handleManualInputChange('solar', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Rüzgar */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Rüzgar Üretimi</label>
                  <input
                    type="number"
                    value={manualData.ruzgar}
                    onChange={(e) => handleManualInputChange('ruzgar', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleManualSubmit}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Veri Ekle
                </button>
              </div>
            </div>

            {/* Bilgi Kartı */}
            <div className="space-y-6">
              <div className="bg-blue-900 bg-opacity-20 border border-blue-700 rounded-lg p-6">
                <h4 className="text-lg font-bold text-blue-200 mb-4">📝 Veri Giriş Rehberi</h4>
                <ul className="space-y-3 text-sm text-blue-100">
                  <li>• <strong>Tarih:</strong> Verilerin kaydedildiği tarih (ör: 2025-10-15)</li>
                  <li>• <strong>Saat:</strong> Saatlik ölçüm zamanı (ör: 14:30)</li>
                  <li>• <strong>Konum:</strong> Enerji üretim tesisinin adı</li>
                  <li>• <strong>Üretim:</strong> Saatlik toplam enerji üretimi</li>
                  <li>• <strong>Tüketim:</strong> Saatlik toplam enerji tüketimi</li>
                  <li>• <strong>Solar:</strong> Güneş panellerinden üretim</li>
                  <li>• <strong>Rüzgar:</strong> Rüzgar türbinlerinden üretim</li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h4 className="text-lg font-bold text-white mb-4">💡 İpuçları</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>✅ Her gün saatte 1 veri girişi yeterlidir</li>
                  <li>✅ Toplu veri için CSV dosya kullanın</li>
                  <li>✅ Veriler otomatik olarak grafikler/raporları günceller</li>
                  <li>✅ Geçmiş veriler de ekleyebilirsiniz</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Mevcut Veriler */}
        <div className="mt-12 bg-gray-800 rounded-lg border border-gray-700 p-8">
          <h3 className="text-xl font-bold text-white mb-6">📊 Son Yüklenen Veriler</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tarih</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Saat</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Konum</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Üretim</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tüketim</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Solar</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rüzgar</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tarih: '2025-10-15', saat: '14:30', konum: 'İstanbul Santral', uretim: 1200, tuketim: 980, solar: 650, ruzgar: 550 },
                  { tarih: '2025-10-15', saat: '13:00', konum: 'Ankara Tesisi', uretim: 1150, tuketim: 920, solar: 620, ruzgar: 530 },
                  { tarih: '2025-10-14', saat: '15:30', konum: 'İzmir Santral', uretim: 1320, tuketim: 1050, solar: 700, ruzgar: 620 },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 text-sm text-white">{row.tarih}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{row.saat}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{row.konum}</td>
                    <td className="px-6 py-4 text-sm text-yellow-400 font-semibold">{row.uretim} MWh</td>
                    <td className="px-6 py-4 text-sm text-blue-400 font-semibold">{row.tuketim} MWh</td>
                    <td className="px-6 py-4 text-sm text-orange-400">{row.solar}</td>
                    <td className="px-6 py-4 text-sm text-cyan-400">{row.ruzgar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataImportPage;
