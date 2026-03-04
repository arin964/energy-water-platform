# 🌍 ENERJİ-SU YÖNETİM PLATFORMU - KURULUM KILAVUZU

## 📋 İçindekiler
1. [Gereksinimler](#gereksinimler)
2. [Hızlı Başlangıç](#hızlı-başlangıç)
3. [Adım Adım Kurulum](#adım-adım-kurulum)
4. [API Anahtarları](#api-anahtarları)
5. [Veritabanı Yapılandırması](#veritabanı-yapılandırması)
6. [Projeyi Çalıştırma](#projeyi-çalıştırma)
7. [Geliştirme Ortamı](#geliştirme-ortamı)
8. [Sorun Giderme](#sorun-giderme)

---

## 🔧 Gereksinimler

### Sistem Gereksinimleri
- **İşletim Sistemi**: macOS, Linux veya Windows
- **RAM**: Minimum 8GB (16GB önerilir)
- **Disk Alanı**: Minimum 10GB boş alan

### Yazılım Gereksinimleri

#### 1. Docker & Docker Compose
```bash
# Docker kurulumu kontrol et
docker --version
# Docker version 24.0.0 veya üzeri olmalı

# Docker Compose kontrol et
docker-compose --version
# Docker Compose version 2.0.0 veya üzeri olmalı
```

**Kurulum için**: https://docs.docker.com/get-docker/

#### 2. Node.js & npm (Opsiyonel - Lokal geliştirme için)
```bash
# Node.js kurulumu kontrol et
node --version
# v18.0.0 veya üzeri olmalı

npm --version
# 9.0.0 veya üzeri olmalı
```

**Kurulum için**: https://nodejs.org/

#### 3. Python (Opsiyonel - ML servis lokal geliştirme için)
```bash
# Python kurulumu kontrol et
python3 --version
# Python 3.10 veya üzeri olmalı

pip3 --version
```

**Kurulum için**: https://www.python.org/downloads/

---

## 🚀 Hızlı Başlangıç

Docker kullanarak tüm sistemi 3 adımda çalıştırın:

### Adım 1: Projeyi İndirin
```bash
cd /Users/arinfidan/Desktop/energy-water-platform
```

### Adım 2: Environment Dosyasını Oluşturun
```bash
# Ana .env dosyasını oluşturun
cp .env.example .env

# Backend .env dosyasını oluşturun
cp backend/.env.example backend/.env

# Frontend .env dosyasını oluşturun
cp frontend/.env.example frontend/.env

# ML Service .env dosyasını oluşturun
cp ml-service/.env.example ml-service/.env
```

### Adım 3: Docker ile Başlatın
```bash
# Tüm servisleri başlat
docker-compose up -d

# Logları takip et
docker-compose logs -f
```

**Erişim Adresleri:**
- 🎨 Frontend: http://localhost:3000
- 🔧 Backend API: http://localhost:5000
- 🤖 ML Service: http://localhost:8000
- 🗄️ PostgreSQL: localhost:5432
- 📦 Redis: localhost:6379

---

## 📝 Adım Adım Kurulum

### 1. Proje Yapısını Anlamak

```
energy-water-platform/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── models/      # Sequelize modelleri
│   │   ├── controllers/ # API controllers
│   │   ├── services/    # İş mantığı ve dış API'ler
│   │   └── routes/      # API rotaları
│   └── package.json
├── frontend/            # React/Vite Dashboard
│   ├── src/
│   │   ├── components/  # React componentleri
│   │   ├── pages/       # Sayfalar
│   │   ├── services/    # API servisleri
│   │   └── types/       # TypeScript tipleri
│   └── package.json
├── ml-service/          # Python/FastAPI ML Servisi
│   ├── app/
│   │   ├── models/      # LSTM, Prophet, XGBoost modelleri
│   │   ├── routes/      # ML API endpoints
│   │   └── services/    # ML iş mantığı
│   └── requirements.txt
├── database/
│   └── init/            # PostgreSQL init scriptleri
└── docker-compose.yml
```

### 2. Environment Değişkenlerini Yapılandırma

#### Ana .env Dosyası (Kök dizin)
```bash
# .env dosyasını düzenleyin
nano .env
```

Önemli değişkenler:
```env
# Database
POSTGRES_DB=energy_water_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=güçlü_şifre_buraya  # ⚠️ DEĞİŞTİRİN!

# API Keys
NASA_API_KEY=DEMO_KEY  # veya gerçek API key
OPENWEATHER_API_KEY=your_key_here  # ⚠️ Gerekli!
```

#### Backend .env Dosyası
```bash
nano backend/.env
```

Önemli ayarlar:
```env
NODE_ENV=development
PORT=5000

# Database bağlantısı
POSTGRES_HOST=localhost  # Docker kullanıyorsanız: postgres
POSTGRES_PORT=5432
POSTGRES_DB=energy_water_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=güçlü_şifre_buraya

# API Keys
NASA_API_KEY=DEMO_KEY
OPENWEATHER_API_KEY=your_openweather_api_key

# JWT
JWT_SECRET=super_secret_jwt_key_change_this
```

#### Frontend .env Dosyası
```bash
nano frontend/.env
```

```env
VITE_API_URL=http://localhost:5000/api
VITE_ML_URL=http://localhost:8000
VITE_APP_NAME=Enerji-Su Yönetim Platformu
```

#### ML Service .env Dosyası
```bash
nano ml-service/.env
```

```env
PYTHON_ENV=development
PORT=8000

POSTGRES_HOST=localhost  # Docker kullanıyorsanız: postgres
POSTGRES_DB=energy_water_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=güçlü_şifre_buraya

# Model parametreleri
LSTM_EPOCHS=100
LSTM_BATCH_SIZE=32
TRAIN_TEST_SPLIT=0.7
```

### 3. API Anahtarları Almak

#### NASA POWER API
- 🌐 Website: https://power.larc.nasa.gov/
- 📝 Ücretsiz, kayıt gerektirmez
- 🔑 API Key: `DEMO_KEY` kullanabilirsiniz veya kayıt olun

#### OpenWeather API
- 🌐 Website: https://openweathermap.org/api
- 📝 Ücretsiz hesap oluşturun
- 🔑 API Key: Dashboard'dan alın
- ⚠️ **Önemli**: Bu API key gereklidir!

#### MGM API (Opsiyonel)
- 🌐 Website: https://www.mgm.gov.tr/
- 📝 Kurumsal başvuru gerektirir
- 🔄 Şimdilik mock data kullanılacak

#### DSİ API (Opsiyonel)
- 🌐 Website: https://www.dsi.gov.tr/
- 📝 Kurumsal başvuru gerektirir
- 🔄 Şimdilik mock data kullanılacak

#### TÜİK API (Opsiyonel)
- 🌐 Website: https://data.tuik.gov.tr/
- 📝 Kayıt gerektirir
- 🔄 Şimdilik mock data kullanılacak

---

## 🐳 Docker ile Kurulum ve Çalıştırma

### Tüm Servisleri Başlatma
```bash
# Servisleri arka planda başlat
docker-compose up -d

# Servisleri loglarla başlat (debugging için)
docker-compose up
```

### Servis Durumunu Kontrol Etme
```bash
# Çalışan servisleri listele
docker-compose ps

# Belirli bir servisin loglarını göster
docker-compose logs backend
docker-compose logs frontend
docker-compose logs ml-service
docker-compose logs postgres

# Tüm logları takip et
docker-compose logs -f
```

### Servisleri Durdurma
```bash
# Servisleri durdur
docker-compose stop

# Servisleri durdur ve container'ları kaldır
docker-compose down

# Servisleri durdur, container ve volume'leri kaldır (⚠️ VERİ SİLİNİR!)
docker-compose down -v
```

### Yeniden Başlatma
```bash
# Servisleri yeniden başlat
docker-compose restart

# Belirli bir servisi yeniden başlat
docker-compose restart backend
```

### Veritabanını Sıfırlama
```bash
# Veritabanını sıfırla ve yeniden oluştur
docker-compose down -v
docker-compose up -d postgres
# PostgreSQL başlamasını bekleyin (yaklaşık 10 saniye)
docker-compose up -d
```

---

## 💻 Lokal Geliştirme Ortamı (Docker olmadan)

### Backend (Node.js)

#### 1. Bağımlılıkları Yükleyin
```bash
cd backend
npm install
```

#### 2. PostgreSQL ve Redis'i Başlatın
```bash
# Sadece database servislerini başlat
docker-compose up -d postgres redis
```

#### 3. Backend'i Çalıştırın
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

### Frontend (React)

#### 1. Bağımlılıkları Yükleyin
```bash
cd frontend
npm install
```

#### 2. Frontend'i Çalıştırın
```bash
# Development server
npm run dev

# Production build
npm run build
npm run preview
```

### ML Service (Python)

#### 1. Virtual Environment Oluşturun
```bash
cd ml-service
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# veya
venv\Scripts\activate  # Windows
```

#### 2. Bağımlılıkları Yükleyin
```bash
pip install -r requirements.txt
```

#### 3. ML Service'i Çalıştırın
```bash
# Development mode
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## 🗄️ Veritabanı Yönetimi

### PostgreSQL'e Bağlanma
```bash
# Docker container içinden
docker-compose exec postgres psql -U admin -d energy_water_db

# Lokal PostgreSQL client ile
psql -h localhost -U admin -d energy_water_db
```

### Veritabanı Komutları
```sql
-- Tabloları listele
\dt

-- Belirli bir tablonun yapısını göster
\d energy_data

-- Veri sorgulama
SELECT * FROM energy_data LIMIT 10;
SELECT * FROM water_data WHERE region = 'Ankara';
SELECT * FROM dam_data ORDER BY timestamp DESC LIMIT 5;

-- İstatistikler
SELECT COUNT(*) FROM energy_data;
SELECT AVG(energy_produced) FROM energy_data;
SELECT name, AVG(fill_percentage) FROM dam_data GROUP BY name;
```

### Backup ve Restore
```bash
# Backup oluştur
docker-compose exec postgres pg_dump -U admin energy_water_db > backup.sql

# Restore et
docker-compose exec -T postgres psql -U admin energy_water_db < backup.sql
```

---

## 🧪 Test Etme

### Backend Testleri
```bash
cd backend
npm test

# Coverage raporu ile
npm run test:coverage
```

### API Endpoint Testleri
```bash
# Health check
curl http://localhost:5000/health

# Enerji verileri
curl http://localhost:5000/api/energy

# Su verileri
curl http://localhost:5000/api/water

# Baraj verileri
curl http://localhost:5000/api/dam

# ML tahmin
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"type": "energy", "days": 7}'
```

---

## 🐛 Sorun Giderme

### Problem: Docker servisleri başlamıyor
```bash
# Docker daemon'ı kontrol et
docker info

# Port çakışması kontrolü
lsof -i :5000
lsof -i :3000
lsof -i :8000

# Docker'ı yeniden başlat
# macOS: Docker Desktop'ı yeniden başlatın
# Linux: sudo systemctl restart docker
```

### Problem: Veritabanı bağlantı hatası
```bash
# PostgreSQL container'ının çalıştığını kontrol et
docker-compose ps postgres

# PostgreSQL loglarını kontrol et
docker-compose logs postgres

# Veritabanını yeniden başlat
docker-compose restart postgres
```

### Problem: Frontend API'ye bağlanamıyor
- `.env` dosyasında `VITE_API_URL` değişkenini kontrol edin
- Backend servisinin çalıştığından emin olun: `curl http://localhost:5000/health`
- CORS ayarlarını kontrol edin

### Problem: ML Service hataları
```bash
# ML Service loglarını kontrol et
docker-compose logs ml-service

# Python bağımlılıklarını kontrol et
docker-compose exec ml-service pip list

# ML Service'i yeniden build et
docker-compose build ml-service
docker-compose up -d ml-service
```

### Problem: Port zaten kullanımda
```bash
# Hangi process kullanıyor bul
lsof -i :5000

# Process'i sonlandır
kill -9 <PID>

# Veya docker-compose.yml'de portları değiştir
```

---

## 📊 Proje Durumunu İzleme

### Container Kaynak Kullanımı
```bash
docker stats
```

### Disk Kullanımı
```bash
docker system df
```

### Container İçine Girme
```bash
# Backend
docker-compose exec backend sh

# ML Service
docker-compose exec ml-service bash

# PostgreSQL
docker-compose exec postgres bash
```

---

## 🎯 Sonraki Adımlar

1. ✅ Kurulum tamamlandı
2. 📊 Dashboard'u açın: http://localhost:3000
3. 🔍 API dokümantasyonunu inceleyin: `docs/API.md`
4. 🤖 ML modellerini eğitin
5. 📈 Veri toplama job'larını başlatın

---

## 📞 Destek

Sorun yaşıyorsanız:
1. `KURULUM_NOTLARI.md` dosyasını kontrol edin
2. `docs/` klasöründeki dokümantasyonu okuyun
3. GitHub Issues'da arama yapın

---

**Başarılı kurulumlar! 🚀**
