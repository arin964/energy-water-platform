# 🌍 YAPAY ZEKA TABANLI ENTEGRE ENERJİ-SU KAYNAK YÖNETİMİ

## SÜRDÜRÜLEBİLİRLİK VE OPTİMUM PLANLAMA PLATFORMU

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-blue.svg)](https://www.typescriptlang.org/)

---

## 📖 Proje Hakkında

Günümüzde enerji ve su yönetimi, **iklim değişikliği, nüfus artışı ve kaynakların düzensiz kullanımı** nedeniyle kritik bir öneme sahiptir. Bu platform, literatürde eksikliği hissedilen **bütünleşik enerji-su yönetimi yaklaşımını** yapay zekâ tabanlı tahminleme ve optimizasyon yöntemleriyle birleştirerek önemli bir bilimsel katkı sunmaktadır.

### 🎯 Temel Hedefler

- ☀️ **Güneş enerjisi üretimini %85+ doğrulukla tahmin etmek**
- 💧 **Su tüketimini ve baraj doluluk seviyelerini modellemek**
- ⚡ **Enerji-su dengesini optimize etmek**
- 🔔 **Kritik eşik değerler için erken uyarı sistemi**
- 📊 **İnteraktif web tabanlı dashboard**
- 🧪 **5+ farklı senaryo analizi gerçekleştirmek**

### 🌟 Temel Özellikler

#### AI & Machine Learning
- 🤖 **3 Farklı Model**: LSTM, Prophet, XGBoost
- � **Zaman Serisi Tahmini**: Enerji, su, baraj seviyeleri
- 🔍 **Model Karşılaştırması**: RMSE, MAE, MAPE, R² metrikleri
- 🎓 **Otomatik Model Eğitimi**: Scheduled training jobs

#### Optimizasyon
- ⚙️ **Doğrusal Programlama**: Kaynak optimizasyonu
- 🧬 **Genetik Algoritma**: Alternatif çözümler
- � **Senaryo Analizi**: 
  - Düşük yağış senaryosu
  - Ani talep artışı
  - Düşük güneş radyasyonu
  - Peak hours yönetimi
  - Kuraklık senaryosu

#### Veri Kaynakları
- 🛰️ **NASA POWER API**: Güneş radyasyonu, meteorolojik veriler
- 🏞️ **DSİ**: Baraj doluluk seviyeleri (mock data - API bekleniyor)
- 🌦️ **MGM**: Yağış ve hava durumu verileri (mock data - API bekleniyor)
- 📊 **TÜİK**: Su tüketim istatistikleri (mock data - API bekleniyor)

#### Dashboard & Görselleştirme
- 📊 **Real-time Monitoring**: Anlık veri takibi
- 📈 **İnteraktif Grafikler**: Recharts ile gelişmiş grafikler
- 🗺️ **Harita Entegrasyonu**: Coğrafi veri görselleştirme (yakında)
- 🔔 **Uyarı Sistemi**: 3 seviyeli (info, warning, critical)
- 📱 **Responsive Design**: Mobil uyumlu

---

## 🛠️ Teknoloji Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Cache**: Redis
- **Validation**: Joi
- **Logging**: Winston
- **Scheduling**: node-cron
- **API Documentation**: Swagger (yakında)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Toastify

### ML Service
- **Framework**: FastAPI
- **Deep Learning**: TensorFlow/Keras
- **Time Series**: Prophet (Meta)
- **Gradient Boosting**: XGBoost
- **Data Processing**: NumPy, Pandas
- **Optimization**: SciPy
- **Database**: SQLAlchemy + psycopg2
- **Visualization**: Matplotlib, Seaborn

### Database & Infrastructure
- **Primary DB**: PostgreSQL 15
- **Cache**: Redis 7
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx (production için)

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- ✅ Docker Desktop (v24.0.0+)
- ✅ Docker Compose (v2.0.0+)
- ✅ 8GB+ RAM (16GB önerilir)
- ✅ 10GB+ boş disk alanı

### Adım 1: Environment Dosyalarını Oluşturun

```bash
# Proje dizinine gidin
cd energy-water-platform

# Tüm .env dosyalarını oluşturun
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp ml-service/.env.example ml-service/.env
```

### Adım 2: API Anahtarlarını Yapılandırın

`.env` dosyasını düzenleyin ve şu değerleri ekleyin:

```env
# Önemli: OpenWeather API key (ücretsiz kayıt gerektirir)
OPENWEATHER_API_KEY=your_openweather_api_key_here

# NASA API (DEMO_KEY kullanılabilir)
NASA_API_KEY=DEMO_KEY

# Database şifresi (güçlü bir şifre kullanın)
POSTGRES_PASSWORD=your_strong_password_here
```

**OpenWeather API Key Alma:**
1. https://openweathermap.org/api adresine gidin
2. Ücretsiz hesap oluşturun
3. API Keys bölümünden key'inizi alın

### Adım 3: Docker ile Başlatın

```bash
# Tüm servisleri build edin ve başlatın
docker-compose up --build -d

# Logları takip edin
docker-compose logs -f
```

**İlk başlatma 5-10 dakika sürebilir.**

### Adım 4: Platform'u Açın

- 🎨 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:5000
- 🤖 **ML Service**: http://localhost:8000/docs
- 🗄️ **PostgreSQL**: localhost:5432

---

## 📚 Dokümantasyon

- 📘 **[BAŞLANGIÇ_REHBERI.md](./BASLANGIC_REHBERI.md)** - Adım adım kurulum ve kullanım
- 📙 **[KURULUM_REHBERI.md](./KURULUM_REHBERI.md)** - Detaylı kurulum dokümantasyonu
- 📗 **[PROJE_DETAYLARI.md](./PROJE_DETAYLARI.md)** - Proje metodolojisi ve bilimsel yaklaşım
- 📕 **[docs/API.md](./docs/API.md)** - API endpoint dokümantasyonu
- 📔 **[docs/SETUP.md](./docs/SETUP.md)** - Geliştirme ortamı kurulumu

---

## 📁 Proje Yapısı

```
energy-water-platform/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── models/            # Sequelize ORM modelleri
│   │   │   ├── Energy.ts      # Enerji verisi modeli
│   │   │   ├── Water.ts       # Su tüketimi modeli
│   │   │   ├── Dam.ts         # Baraj verisi modeli
│   │   │   ├── Forecast.ts    # Tahmin sonuçları
│   │   │   ├── Alert.ts       # Uyarı sistemi
│   │   │   ├── Optimization.ts # Optimizasyon senaryoları
│   │   │   └── ModelMetrics.ts # Model performans metrikleri
│   │   ├── controllers/       # API endpoint controllers
│   │   ├── services/          # İş mantığı ve dış API entegrasyonları
│   │   │   └── dataCollector/ # Veri toplama servisleri
│   │   │       ├── nasaService.ts    # NASA POWER API
│   │   │       ├── weatherService.ts # OpenWeather API
│   │   │       ├── dsiService.ts     # DSİ baraj verileri
│   │   │       └── tuikService.ts    # TÜİK su tüketimi
│   │   ├── routes/            # API route tanımlamaları
│   │   ├── jobs/              # Cron jobs ve scheduled tasks
│   │   ├── middleware/        # Express middleware'ler
│   │   ├── config/            # Yapılandırma dosyaları
│   │   └── utils/             # Yardımcı fonksiyonlar
│   ├── tests/                 # Unit ve integration testler
│   └── package.json
├── frontend/                   # React Dashboard
│   ├── src/
│   │   ├── components/        # React componentleri
│   │   │   ├── charts/        # Grafik componentleri
│   │   │   ├── common/        # Ortak componentler
│   │   │   ├── dashboard/     # Dashboard bileşenleri
│   │   │   └── forms/         # Form bileşenleri
│   │   ├── pages/             # Sayfa componentleri
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Energy.tsx
│   │   │   ├── Water.tsx
│   │   │   ├── Dam.tsx
│   │   │   ├── Optimization.tsx
│   │   │   └── Alerts.tsx
│   │   ├── services/          # API servisleri
│   │   ├── store/             # State management
│   │   ├── types/             # TypeScript type tanımları
│   │   └── utils/             # Yardımcı fonksiyonlar
│   └── package.json
├── ml-service/                # Python ML Servisi
│   ├── app/
│   │   ├── models/            # ML modelleri
│   │   │   ├── lstm_energy.py      # LSTM modeli
│   │   │   ├── prophet_model.py    # Prophet modeli
│   │   │   └── optimizer.py        # Optimizasyon algoritmaları
│   │   ├── routes/            # FastAPI endpoints
│   │   │   ├── predict.py     # Tahmin endpoints
│   │   │   └── optimize.py    # Optimizasyon endpoints
│   │   ├── services/          # ML iş mantığı
│   │   ├── utils/             # Yardımcı fonksiyonlar
│   │   └── trained_models/    # Eğitilmiş model dosyaları
│   └── requirements.txt
├── database/                  # Database scripts
│   ├── init/                  # Initialization scripts
│   │   └── 01-init.sql       # PostgreSQL schema
│   └── migrations/            # Database migrations
├── docs/                      # Dokümantasyon
│   ├── API.md
│   └── SETUP.md
├── docker-compose.yml         # Docker orchestration
├── .env.example              # Environment variables template
└── README.md                 # Bu dosya
```

---

## 🔄 Sık Kullanılan Komutlar

### Docker İşlemleri

```bash
# Servisleri başlat
docker-compose up -d

# Servisleri durdur
docker-compose down

# Servisleri yeniden başlat
docker-compose restart

# Logları görüntüle
docker-compose logs -f

# Belirli bir servisin logları
docker-compose logs -f backend

# Container içine bağlan
docker-compose exec backend sh
docker-compose exec ml-service bash

# Veritabanını sıfırla (DİKKAT: Veri kaybı!)
docker-compose down -v
docker-compose up -d
```

### Veritabanı İşlemleri

```bash
# PostgreSQL'e bağlan
docker-compose exec postgres psql -U admin -d energy_water_db

# Backup oluştur
docker-compose exec postgres pg_dump -U admin energy_water_db > backup.sql

# Restore et
docker-compose exec -T postgres psql -U admin energy_water_db < backup.sql
```

### API Test Komutları

```bash
# Health check
curl http://localhost:5000/health

# Enerji verileri
curl http://localhost:5000/api/energy

# Su verileri
curl http://localhost:5000/api/water

# Tahmin yap
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"type": "energy", "days": 7}'
```

---

## 🧪 Geliştirme

### Lokal Geliştirme Ortamı

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### ML Service
```bash
cd ml-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Test Çalıştırma

```bash
# Backend testleri
cd backend
npm test

# Frontend testleri
cd frontend
npm test

# ML Service testleri
cd ml-service
pytest
```

---

## � Veri Modeli ve İlişkiler

### Temel Tablolar

1. **energy_data** - Güneş enerjisi üretim verileri
2. **water_data** - Su tüketim verileri
3. **dam_data** - Baraj doluluk ve akış verileri
4. **forecasts** - Model tahmin sonuçları
5. **optimization_scenarios** - Optimizasyon senaryoları
6. **alerts** - Sistem uyarıları
7. **model_metrics** - Model performans metrikleri

### Bağımlı ve Bağımsız Değişkenler

**Enerji Modeli:**
- **Bağımlı**: `energy_produced` (MWh)
- **Bağımsız**: `solar_radiation`, `temperature`, `humidity`, `wind_speed`

**Su Modeli:**
- **Bağımlı**: `consumption` (m³)
- **Bağımsız**: `rainfall`, `temperature`, `population`, geçmiş tüketim

**Baraj Modeli:**
- **Bağımlı**: `fill_percentage` (%)
- **Bağımsız**: `inflow`, `outflow`, `rainfall`, `temperature`

---

## 🎯 Proje Takvimi

### ✅ Faz 1: Temel Altyapı (Tamamlandı)
- Database schema tasarımı
- Backend API iskelet
- Frontend dashboard iskelet
- ML servis temel yapısı
- Docker yapılandırması

### 🔄 Faz 2: Veri Toplama (Devam Ediyor)
- NASA POWER API entegrasyonu
- Mock data servisleri (DSİ, MGM, TÜİK)
- Veri temizleme ve preprocessing
- Cron jobs yapılandırması

### 📋 Faz 3: Model Geliştirme (Planlanıyor)
- LSTM model eğitimi
- Prophet model eğitimi
- XGBoost model eğitimi
- Model karşılaştırması
- Hyperparameter tuning

### 📋 Faz 4: Optimizasyon (Planlanıyor)
- Doğrusal programlama implementasyonu
- Genetik algoritma implementasyonu
- Senaryo analizi engine
- Optimizasyon API'leri

### 📋 Faz 5: Dashboard (Planlanıyor)
- İnteraktif grafikler
- Real-time data updates
- Alert sistemi UI
- Senaryo yönetimi UI
- Responsive design

---

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isterseniz:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

---



---

## 👥 Takım

- **Backend Development**: Node.js/TypeScript
- **Frontend Development**: React/TypeScript
- **ML/AI Engineering**: Python/TensorFlow
- **DevOps**: Docker/CI-CD
- **Data Engineering**: PostgreSQL/ETL

---

## 🌟 Özellikler (Roadmap)

### v1.0 (Mevcut)
- ✅ Temel altyapı
- ✅ Database schema
- ✅ API endpoints (iskelet)
- ✅ Dashboard (temel)
- ✅ Docker yapılandırması

### v1.1 (Yakında)
- 🔄 NASA POWER veri toplama
- 🔄 Mock data servisleri
- � LSTM model eğitimi
- 🔄 Temel tahmin API'leri

### v1.2 (Planlanıyor)
- 📋 Prophet ve XGBoost modelleri
- 📋 Model karşılaştırması
- 📋 İnteraktif grafikler
- 📋 Alert sistemi

### v2.0 (Gelecek)
- 📋 Optimizasyon algoritmaları
- 📋 Senaryo analizi
- 📋 Harita entegrasyonu
- 📋 Mobile app
- 📋 API authentication
- 📋 Multi-language support

---

## 📞 İletişim ve Destek

- 📧 Email: [proje email]
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 📖 Wiki: [GitHub Wiki](https://github.com/your-repo/wiki)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-repo/discussions)

---

## 🙏 Teşekkürler

Bu proje şu açık kaynak projeleri ve API'leri kullanmaktadır:

- NASA POWER API
- OpenWeather API
- TensorFlow/Keras
- Prophet (Meta)
- XGBoost
- React & Vite
- Tailwind CSS
- FastAPI
- Express.js
- PostgreSQL

---

