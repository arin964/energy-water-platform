# 🚀 ADIM ADIM BAŞLANGIÇ REHBERİ

## Projenizi Çalıştırmak İçin İzlemeniz Gereken Adımlar

---

## ✅ ADIM 1: Gereksinimleri Kontrol Edin

### 1.1 Docker Kurulumu
```bash
# Terminal'de çalıştırın:
docker --version
docker-compose --version
```

**Beklenen Çıktı:**
- Docker version 24.0.0 veya üzeri
- Docker Compose version 2.0.0 veya üzeri

**Eğer kurulu değilse:**
- macOS: https://docs.docker.com/desktop/install/mac-install/
- Windows: https://docs.docker.com/desktop/install/windows-install/
- Linux: https://docs.docker.com/engine/install/

### 1.2 Terminal Kontrolleri
```powershell
# PowerShell'i açın ve proje dizinine gidin
cd C:\Users\fidan\OneDrive\Desktop\energy-water-platform

# Dizin yapısını kontrol edin
Get-ChildItem -Force
```

**Görmeniz gerekenler:**
- backend/
- frontend/
- ml-service/
- database/
- docker-compose.yml
- .env.example

---

## ✅ ADIM 2: Environment Dosyalarını Oluşturun

### 2.1 Ana .env Dosyası
```powershell
# Ana .env dosyasını oluşturun
Copy-Item .env.example .env
```

### 2.2 Backend .env Dosyası
```powershell
# Backend .env dosyasını oluşturun
Copy-Item backend\.env.example backend\.env
```

### 2.3 Frontend .env Dosyası
```powershell
# Frontend .env dosyasını oluşturun
Copy-Item frontend\.env.example frontend\.env
```

### 2.4 ML Service .env Dosyası
```powershell
# ML Service .env dosyasını oluşturun
Copy-Item ml-service\.env.example ml-service\.env
```

### 2.5 Tüm .env Dosyalarını Tek Komutla Oluşturun (Alternatif)
```powershell
Copy-Item .env.example .env
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
Copy-Item ml-service\.env.example ml-service\.env

Write-Host "✅ Tüm .env dosyaları oluşturuldu!"
```

---

## ✅ ADIM 3: API Anahtarlarını Edinin (Opsiyonel ama Önerilir)

### 3.1 OpenWeather API Key (ÖNEMLİ!)

1. **Kayıt Olun**: https://home.openweathermap.org/users/sign_up
2. **API Key Alın**: https://home.openweathermap.org/api_keys
3. **`.env` dosyasına ekleyin**:
   ```powershell
   # .env dosyasını Notepad ile düzenleyin
   notepad .env
   
   # Bu satırı bulun ve değiştirin:
   OPENWEATHER_API_KEY=your_key_here
   
   
   # Dosyayı kaydedin ve kapatın
   ```

### 3.2 NASA POWER API (Ücretsiz, key gerekmez)
```bash
# .env dosyasında zaten ayarlı:
NASA_API_KEY=DEMO_KEY
```

### 3.3 Diğer API'ler (Şimdilik Opsiyonel)
- **MGM**: Kurumsal başvuru gerektirir (şimdilik mock data kullanılacak)
- **DSİ**: Kurumsal başvuru gerektirir (şimdilik mock data kullanılacak)
- **TÜİK**: Kayıt gerektirir (şimdilik mock data kullanılacak)

---

## ✅ ADIM 4: Docker ile Projeyi Başlatın

### 4.1 İlk Kez Başlatma
```bash
# Tüm servisleri build edin ve başlatın
docker-compose up --build -d
```

**Bu komut:**
- ✅ PostgreSQL veritabanını başlatır
- ✅ Redis cache'i başlatır
- ✅ Backend API'yi build eder ve başlatır
- ✅ Frontend'i build eder ve başlatır
- ✅ ML Service'i build eder ve başlatır

**Süre**: İlk build işlemi 5-10 dakika sürebilir.

### 4.2 Logları İzleyin
```bash
# Tüm servislerin loglarını görmek için
docker-compose logs -f

# Belirli bir servisin loglarını görmek için:
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f ml-service
docker-compose logs -f postgres
```

**Çıkmak için**: `Ctrl + C`

### 4.3 Servislerin Durumunu Kontrol Edin
```bash
docker-compose ps
```

**Beklenen Çıktı:**
```
NAME                         STATUS              PORTS
energy_water_backend         Up                  0.0.0.0:5000->5000/tcp
energy_water_frontend        Up                  0.0.0.0:3000->3000/tcp
energy_water_ml              Up                  0.0.0.0:8000->8000/tcp
energy_water_postgres        Up (healthy)        0.0.0.0:5432->5432/tcp
energy_water_redis           Up (healthy)        0.0.0.0:6379->6379/tcp
```

---

## ✅ ADIM 5: Platformu Test Edin

### 5.1 Frontend'i Açın
Tarayıcınızda:
```
http://localhost:3000
```

**Görmeniz gerekenler:**
- ✅ Dashboard ana sayfası
- ✅ Sidebar menü
- ✅ Grafik componentleri

### 5.2 Backend API'yi Test Edin
Terminal'de:
```bash
# Health check
curl http://localhost:5000/health

# Enerji verileri
curl http://localhost:5000/api/energy

# Su verileri
curl http://localhost:5000/api/water

# Baraj verileri
curl http://localhost:5000/api/dam
```

### 5.3 ML Service'i Test Edin
```bash
# Health check
curl http://localhost:8000/health

# API docs
# Tarayıcıda açın:
http://localhost:8000/docs
```

### 5.4 Veritabanını Kontrol Edin
```bash
# PostgreSQL'e bağlanın
docker-compose exec postgres psql -U admin -d energy_water_db

# SQL komutları:
\dt                          -- Tabloları listele
SELECT COUNT(*) FROM energy_data;
SELECT COUNT(*) FROM water_data;
SELECT COUNT(*) FROM dam_data;
\q                           -- Çık
```

---

## ✅ ADIM 6: Veri Toplama İşlemlerini Başlatın

### 6.1 Manuel Veri Toplama (Test için)
```powershell
# Backend container'ına bağlanın
docker-compose exec backend powershell

# Veri toplama scriptini çalıştırın (henüz oluşturulmadı, yakında eklenecek)
# npm run collect:energy
# npm run collect:water
# npm run collect:dam

# Container'dan çıkın
exit
```

### 6.2 Otomatik Veri Toplama (Cron Jobs)
Cron job'lar backend başladığında otomatik olarak çalışır:
- **Enerji verileri**: Her 6 saatte bir
- **Su verileri**: Her 12 saatte bir
- **Baraj verileri**: Günde bir kez

Backend loglarından kontrol edebilirsiniz:
```bash
docker-compose logs -f backend | grep "cron"
```

---

## ✅ ADIM 7: ML Modellerini Eğitin

### 7.1 Model Eğitim Scriptini Çalıştırın
```powershell
# ML service container'ına bağlanın
docker-compose exec ml-service powershell

# Model eğitim scripti (yakında eklenecek)
# python app/scripts/train_models.py

# Container'dan çıkın
exit
```

### 7.2 Model Performansını Kontrol Edin
```bash
# Model metrics API'sini kullanın
curl http://localhost:8000/api/models/metrics
```

---

## ✅ ADIM 8: Optimizasyon Senaryolarını Çalıştırın

### 8.1 Senaryo Oluşturma (Dashboard üzerinden)
1. Dashboard'u açın: http://localhost:3000
2. "Optimizasyon" menüsüne gidin
3. "Yeni Senaryo" butonuna tıklayın
4. Senaryo parametrelerini girin
5. "Hesapla" butonuna tıklayın

### 8.2 API ile Senaryo Oluşturma
```bash
curl -X POST http://localhost:5000/api/optimization \
  -H "Content-Type: application/json" \
  -d '{
    "scenarioName": "Test Senaryosu",
    "scenarioType": "high_demand",
    "targetDate": "2025-12-01",
    "energyDemand": 1000,
    "waterDemand": 50000,
    "solarCapacity": 800,
    "damLevel": 75
  }'
```

---

## ✅ ADIM 9: Dashboard'u Keşfedin

### 9.1 Ana Dashboard
- 📊 Genel istatistikler
- 📈 Zaman serisi grafikleri
- 🗺️ Harita görünümü (yakında)
- 🔔 Aktif uyarılar

### 9.2 Enerji Sayfası
- Güneş enerjisi üretim grafikleri
- Tahmin vs gerçek karşılaştırması
- Model performans metrikleri

### 9.3 Su Sayfası
- Su tüketim grafikleri
- Sektörel dağılım
- Bölgesel analiz

### 9.4 Baraj Sayfası
- Baraj doluluk seviyeleri
- İnflow/Outflow grafikleri
- Kritik seviye uyarıları

### 9.5 Optimizasyon Sayfası
- Senaryo listesi
- Senaryo karşılaştırması
- Optimizasyon önerileri

### 9.6 Uyarılar Sayfası
- Aktif uyarılar
- Uyarı geçmişi
- Uyarı ayarları

---

## ✅ ADIM 10: Geliştirme Yapın (Opsiyonel)

### 10.1 Lokal Geliştirme Ortamı

#### Backend Lokal Çalıştırma
```powershell
# Backend dizinine gidin
cd backend

# Node modüllerini yükleyin
npm install

# Sadece DB ve Redis'i Docker'da çalıştırın
docker-compose up -d postgres redis

# Backend'i lokal çalıştırın
npm run dev
```

#### Frontend Lokal Çalıştırma
```powershell
# Frontend dizinine gidin
cd frontend

# Node modüllerini yükleyin
npm install

# Frontend'i lokal çalıştırın
npm run dev
```

#### ML Service Lokal Çalıştırma
```powershell
# ML service dizinine gidin
cd ml-service

# Virtual environment oluşturun (Windows)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Paketleri yükleyin
pip install -r requirements.txt

# ML service'i çalıştırın
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## 🔄 Sık Kullanılan Komutlar

### Servisleri Yönetme
```bash
# Tüm servisleri başlat
docker-compose up -d

# Servisleri durdur
docker-compose stop

# Servisleri durdur ve kaldır
docker-compose down

# Servisleri yeniden başlat
docker-compose restart

# Belirli bir servisi yeniden başlat
docker-compose restart backend

# Servisleri yeniden build et
docker-compose up --build -d
```

### Logları İzleme
```bash
# Tüm loglar
docker-compose logs -f

# Belirli servis
docker-compose logs -f backend

# Son 100 satır
docker-compose logs --tail=100 backend
```

### Container'a Bağlanma
```bash
# Backend
docker-compose exec backend sh

# ML Service
docker-compose exec ml-service bash

# PostgreSQL
docker-compose exec postgres psql -U admin -d energy_water_db
```

### Veritabanı İşlemleri
```powershell
# Backup oluştur
$date = Get-Date -Format "yyyyMMdd"
docker-compose exec -T postgres pg_dump -U admin energy_water_db > "backup_$date.sql"

# Restore et
docker-compose exec -T postgres psql -U admin energy_water_db < backup_20250126.sql

# Veritabanını sıfırla
docker-compose down -v
docker-compose up -d
```

---

## ⚠️ Yaygın Sorunlar ve Çözümleri

### Sorun 1: Port zaten kullanımda
```powershell
# Hangi process kullanıyor?
Get-NetTCPConnection -LocalPort 5000
Get-NetTCPConnection -LocalPort 3000
Get-NetTCPConnection -LocalPort 8000

# Process'i sonlandır (örnek olarak 1234 PID için)
Stop-Process -Id 1234 -Force

# Veya docker-compose.yml'de portları değiştir
```

### Sorun 2: Docker servisi başlamıyor
```powershell
# Docker Desktop'ı yeniden başlat
# Windows: Start menüsünden Docker Desktop'ı kapatın ve açın

# Docker temizliği
docker system prune -a
```

### Sorun 3: Veritabanı bağlantı hatası
```bash
# PostgreSQL container'ının durumunu kontrol et
docker-compose ps postgres

# PostgreSQL loglarını kontrol et
docker-compose logs postgres

# PostgreSQL'i yeniden başlat
docker-compose restart postgres
```

### Sorun 4: Frontend API'ye bağlanamıyor
```powershell
# Backend'in çalıştığından emin olun
curl http://localhost:5000/health

# CORS ayarlarını kontrol edin
# backend/src/app.ts dosyasında CORS origin'i kontrol edin

# .env dosyasını kontrol edin
Get-Content frontend\.env
# VITE_API_URL doğru olmalı
```

### Sorun 5: ML Service hataları
```bash
# ML Service loglarını kontrol et
docker-compose logs ml-service

# Dependencies kontrol et
docker-compose exec ml-service pip list

# ML Service'i yeniden build et
docker-compose build ml-service
docker-compose up -d ml-service
```

---

## 📊 Sistem Durumu Kontrol Listesi

Her gün projeyi başlatmadan önce:

- [ ] Docker Desktop çalışıyor mu?
- [ ] Yeterli disk alanı var mı? (min 5GB)
- [ ] Yeterli RAM var mı? (min 4GB boş)
- [ ] `.env` dosyaları mevcut mu?
- [ ] API anahtarları güncel mi?

Sistem çalışırken:

- [ ] Tüm 5 servis "Up" durumunda mı?
- [ ] Frontend açılıyor mu? (http://localhost:3000)
- [ ] Backend API cevap veriyor mu? (http://localhost:5000/health)
- [ ] ML Service erişilebilir mi? (http://localhost:8000/docs)
- [ ] PostgreSQL bağlantısı sağlıklı mı?
- [ ] Redis bağlantısı sağlıklı mı?

---

## 🎯 Sonraki Adımlar

1. ✅ Tüm adımları tamamladıysanız, platform kullanıma hazır!
2. 📖 `PROJE_DETAYLARI.md` dosyasını okuyun
3. 🔧 `docs/API.md` dosyasından API dokümantasyonunu inceleyin
4. 🤖 ML modellerini eğitin
5. 📊 Veri toplama işlemlerini başlatın
6. 🧪 Optimizasyon senaryolarını deneyin
7. 🎨 Dashboard'u özelleştirin

---

## 📞 Yardım

Sorun yaşıyorsanız:

1. `KURULUM_REHBERI.md` dosyasını kontrol edin
2. Logları inceleyin: `docker-compose logs -f`
3. GitHub Issues'da arama yapın
4. Dokümantasyonu tekrar okuyun

---


**Dashboard**: http://localhost:3000  
**API**: http://localhost:5000  
**ML Service**: http://localhost:8000
