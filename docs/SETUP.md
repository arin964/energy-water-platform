# Kurulum Rehberi

## Gereksinimler

Sisteminizde aşağıdaki yazılımların kurulu olması gerekmektedir:

### Zorunlu
- **Docker Desktop** (https://www.docker.com/products/docker-desktop)
- **Git** (https://git-scm.com/downloads)

### Opsiyonel (Local development için)
- **Node.js 18+** (https://nodejs.org/)
- **Python 3.10+** (https://www.python.org/downloads/)
- **PostgreSQL 15** (https://www.postgresql.org/download/)

## Hızlı Başlangıç (Docker ile)

### 1. Projeyi Klonlayın
```bash
git clone <repo-url>
cd energy-water-platform
```

### 2. Environment Dosyasını Oluşturun
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin ve gerekli API anahtarlarını ekleyin:
- `OPENWEATHER_API_KEY`: OpenWeatherMap API anahtarı (https://openweathermap.org/api)
- `NASA_API_KEY`: Varsayılan olarak DEMO_KEY kullanabilirsiniz

### 3. Docker ile Tüm Servisleri Başlatın
```bash
docker-compose up -d
```

Bu komut şunları yapacak:
- PostgreSQL veritabanını başlatacak
- Redis cache'i başlatacak
- Backend (Node.js) API'yi başlatacak
- ML Service (Python) API'yi başlatacak
- Frontend (React) uygulamasını başlatacak

### 4. Servislerin Durumunu Kontrol Edin
```bash
docker-compose ps
```

### 5. Logları İzleyin
```bash
# Tüm servislerin logları
docker-compose logs -f

# Sadece backend logları
docker-compose logs -f backend

# Sadece frontend logları
docker-compose logs -f frontend
```

### 6. Uygulamayı Açın
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health
- **ML Service**: http://localhost:8000

## Local Development (Docker olmadan)

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### ML Service
```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # Mac/Linux
# veya
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### PostgreSQL
```bash
# Docker ile
docker run -d \
  --name energy-water-postgres \
  -e POSTGRES_DB=energy_water_db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -p 5432:5432 \
  postgres:15-alpine
```

## Veritabanı İşlemleri

### Migration (Backend içinden)
```bash
docker-compose exec backend npm run migrate
```

### Seed Data
```bash
docker-compose exec backend npm run seed
```

### PostgreSQL Shell
```bash
docker-compose exec postgres psql -U admin -d energy_water_db
```

## Durdurma ve Temizleme

### Servisleri Durdur
```bash
docker-compose down
```

### Verileri Temizle (Dikkat! Tüm veriler silinir)
```bash
docker-compose down -v
```

### Yeniden Başlat
```bash
docker-compose down
docker-compose up -d --build
```

## Troubleshooting

### Port çakışması
Eğer portlar kullanılıyorsa, `docker-compose.yml` dosyasında port numaralarını değiştirin:
```yaml
ports:
  - "5001:5000"  # 5000 yerine 5001 kullan
```

### Docker build hataları
```bash
docker-compose build --no-cache
docker-compose up -d
```

### Container loglarına bakma
```bash
docker-compose logs [service-name]
```

## Önemli Notlar

1. **İlk başlatma** biraz zaman alabilir (npm install, pip install)
2. **Database** ilk başlatmada otomatik olarak tablolar oluşturulur
3. **Hot reload** aktif, kod değişiklikleri otomatik yansır
4. **Production** için `docker-compose.prod.yml` kullanın

## Sonraki Adımlar

1. API dokümantasyonunu okuyun: `docs/API.md`
2. Örnek verileri test edin
3. Dashboard'u keşfedin: http://localhost:3000
4. ML modellerini eğitin (notebooks klasörü)
