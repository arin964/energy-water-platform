# API Dokümantasyonu

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Energy

#### GET /energy
Enerji verilerini getirir

**Query Parameters:**
- `startDate` (optional): Başlangıç tarihi
- `endDate` (optional): Bitiş tarihi
- `location` (optional): Lokasyon

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

#### GET /energy/latest
En son enerji verisini getirir

#### GET /energy/stats
Enerji istatistiklerini getirir

### Water

#### GET /water
Su verilerini getirir

#### GET /water/by-sector
Sektöre göre su tüketimi

#### GET /water/stats
Su istatistikleri

### Forecast

#### GET /forecast/energy
Enerji tahmini (ML Service'den)

**Query Parameters:**
- `days` (optional, default: 7): Tahmin gün sayısı

#### GET /forecast/water
Su tüketim tahmini

#### GET /forecast/dam
Baraj seviye tahmini

### Optimization

#### GET /optimization/recommendations
Optimizasyon önerileri

#### POST /optimization/scenario
Senaryo analizi

### Alerts

#### GET /alerts
Tüm uyarılar

#### GET /alerts/active
Aktif uyarılar

#### POST /alerts
Yeni uyarı oluştur

#### PATCH /alerts/:id/resolve
Uyarıyı çöz
