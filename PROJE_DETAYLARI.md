# 🌍 YAPAY ZEKA TABANLI ENTEGRE ENERJİ-SU KAYNAK YÖNETİMİ

## SÜRDÜRÜLEBİLİRLİK VE OPTİMUM PLANLAMA PLATFORMU

---

## 📖 Proje Hakkında

### Özet
Günümüzde enerji ve su yönetimi, iklim değişikliği, nüfus artışı ve kaynakların düzensiz kullanımı nedeniyle kritik bir öneme sahiptir. Bu proje, **bütünleşik enerji-su yönetimi yaklaşımını yapay zekâ tabanlı tahminleme ve optimizasyon yöntemleriyle** birleştirerek sürdürülebilir kaynak yönetimi sağlamayı hedeflemektedir.

### Temel Sorunlar
- ☀️ Güneş enerjisi üretiminin hava koşullarına bağlı değişkenliği
- 💧 Su tüketiminin mevsimsel dalgalanması
- 🏞️ Baraj doluluk seviyelerindeki belirsizlikler
- ⚠️ Enerji ve su sistemlerinin ayrı ayrı planlanması nedeniyle verimlilik kayıpları
- 🚨 Kriz riskinin artması

### Çözüm Yaklaşımı
Bu platform, NASA POWER, DSİ, MGM ve TÜİK gibi kurumlardan sağlanacak çok kaynaklı verilerle:
- 🤖 **LSTM, Prophet ve XGBoost** modelleriyle tahminleme
- ⚡ **Doğrusal programlama** ve **genetik algoritmalar** ile optimizasyon
- 📊 **Web tabanlı dashboard** ile görselleştirme
- 🔔 **Erken uyarı mekanizması** ile kriz yönetimi

---

## 🎯 Proje Hedefleri

### Temel Hedefler (Ölçülebilir)

1. **Tahmin Doğruluğu**
   - ✅ Güneş enerjisi üretimini **en az %85 doğrulukla** tahmin etmek
   - ✅ LSTM, Prophet ve XGBoost modellerini karşılaştırmalı olarak kullanmak
   - ✅ Model performansını RMSE, MAE, MAPE ve R² metrikleriyle ölçmek

2. **Su Tüketimi Tahmini**
   - ✅ Su tüketimini **meteorolojik ve tarihsel verilerle** modellemek
   - ✅ Sektörel bazda (evsel, sanayi, tarım) tahmin yapmak
   - ✅ Mevsimsel dalgalanmaları yakalayabilmek

3. **Baraj Doluluk Öngörüsü**
   - ✅ Baraj doluluk seviyelerini **yağış ve akış verilerine göre** tahmin etmek
   - ✅ İnflow ve outflow dinamiklerini modellemek
   - ✅ Kritik seviyeleri önceden tespit etmek

4. **Optimizasyon**
   - ✅ Enerji ve su tahminlerini **doğrusal programlama** ile optimize etmek
   - ✅ Genetik algoritma ile alternatif senaryolar üretmek
   - ✅ Maliyet-fayda analizi yapmak

5. **Erken Uyarı Sistemi**
   - ✅ Kritik eşik değerler için **otomatik uyarı** üretmek
   - ✅ 3 seviyeli uyarı sistemi (info, warning, critical)
   - ✅ Gerçek zamanlı izleme ve bildirim

6. **Dashboard ve Görselleştirme**
   - ✅ **Interaktif web tabanlı** dashboard geliştirmek
   - ✅ Zaman serisi grafikleri, haritalar ve istatistikler
   - ✅ Responsive tasarım (mobil uyumlu)

7. **Senaryo Analizi**
   - ✅ **En az 5 farklı senaryo** analizi gerçekleştirmek:
     - 🌧️ Düşük yağış senaryosu
     - 📈 Ani talep artışı senaryosu
     - ☀️ Düşük güneş radyasyonu senaryosu
     - ⏰ Peak hours (yoğun saatler) senaryosu
     - 🏜️ Kuraklık senaryosu

---

## 🏗️ Sistem Mimarisi

### Teknoloji Stack'i

#### Backend (Node.js/TypeScript)
- **Framework**: Express.js
- **Database ORM**: Sequelize
- **Cache**: Redis
- **Validation**: Joi
- **Logging**: Winston
- **Cron Jobs**: node-cron

#### Frontend (React/TypeScript)
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React

#### ML Service (Python)
- **Framework**: FastAPI
- **Deep Learning**: TensorFlow/Keras
- **Time Series**: Prophet
- **Gradient Boosting**: XGBoost
- **Data Processing**: NumPy, Pandas
- **Optimization**: SciPy
- **Database**: SQLAlchemy + psycopg2

#### Database
- **Primary**: PostgreSQL 15
- **Cache**: Redis 7
- **Extensions**: UUID, JSONB

#### DevOps
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Docker Compose
- **CI/CD**: (Planlanıyor)

### Veri Kaynakları

#### 1. NASA POWER API
- **Veri**: Güneş radyasyonu, sıcaklık, nem, rüzgar hızı
- **Kapsam**: Global, günlük veriler
- **Format**: JSON
- **Erişim**: Ücretsiz API

#### 2. DSİ (Devlet Su İşleri)
- **Veri**: Baraj doluluk seviyeleri, inflow, outflow
- **Kapsam**: Türkiye'deki tüm barajlar
- **Format**: Excel/CSV/API (planlanıyor)
- **Erişim**: Açık veri platformu / Kurumsal API

#### 3. MGM (Meteoroloji Genel Müdürlüğü)
- **Veri**: Yağış, sıcaklık, hava durumu tahminleri
- **Kapsam**: Türkiye, saatlik/günlük
- **Format**: XML/JSON
- **Erişim**: API (başvuru gerektirir)

#### 4. TÜİK (Türkiye İstatistik Kurumu)
- **Veri**: Su tüketimi (sektörel), nüfus verileri
- **Kapsam**: Türkiye, il bazında
- **Format**: Excel/API
- **Erişim**: Açık veri platformu

---

## 📊 Veri Modeli

### Veritabanı Şeması

#### 1. energy_data
```sql
- id: SERIAL PRIMARY KEY
- timestamp: TIMESTAMP NOT NULL
- solar_radiation: FLOAT (W/m²)
- temperature: FLOAT (°C)
- humidity: FLOAT (%)
- wind_speed: FLOAT (m/s)
- energy_produced: FLOAT (MWh) -- Bağımlı değişken
- location: VARCHAR(255)
- latitude, longitude: FLOAT
- created_at, updated_at: TIMESTAMP
```

#### 2. water_data
```sql
- id: SERIAL PRIMARY KEY
- timestamp: TIMESTAMP NOT NULL
- consumption: FLOAT (m³) -- Bağımlı değişken
- sector: ENUM ('domestic', 'industrial', 'agricultural', 'other')
- region: VARCHAR(255)
- population: INTEGER
- rainfall: FLOAT (mm)
- temperature: FLOAT (°C)
- created_at, updated_at: TIMESTAMP
```

#### 3. dam_data
```sql
- id: SERIAL PRIMARY KEY
- name: VARCHAR(255)
- location: VARCHAR(255)
- capacity: FLOAT (Million m³)
- current_level: FLOAT (Million m³) -- Bağımlı değişken
- fill_percentage: FLOAT (%)
- inflow: FLOAT (m³/s)
- outflow: FLOAT (m³/s)
- timestamp: TIMESTAMP
- latitude, longitude: FLOAT
- created_at, updated_at: TIMESTAMP
```

#### 4. forecasts
```sql
- id: SERIAL PRIMARY KEY
- type: ENUM ('energy', 'water', 'dam')
- target_date: TIMESTAMP
- predicted_value: FLOAT
- confidence: FLOAT
- model_used: VARCHAR(100) ('LSTM', 'Prophet', 'XGBoost')
- parameters: JSONB
- created_at, updated_at: TIMESTAMP
```

#### 5. optimization_scenarios
```sql
- id: SERIAL PRIMARY KEY
- scenario_name: VARCHAR(255)
- scenario_type: ENUM ('low_rainfall', 'high_demand', 'low_solar', 'peak_hours', 'drought', 'custom')
- target_date: TIMESTAMP
- energy_demand: FLOAT
- water_demand: FLOAT
- solar_capacity: FLOAT
- dam_level: FLOAT
- optimized_energy_allocation: FLOAT
- optimized_water_allocation: FLOAT
- efficiency: FLOAT (%)
- cost: FLOAT (TRY)
- parameters: JSONB
- recommendations: TEXT
- status: ENUM ('pending', 'completed', 'failed')
- created_at, updated_at: TIMESTAMP
```

#### 6. alerts
```sql
- id: SERIAL PRIMARY KEY
- type: ENUM ('warning', 'critical', 'info')
- category: ENUM ('energy', 'water', 'dam', 'optimization')
- title: VARCHAR(255)
- message: TEXT
- severity: INTEGER (1-10)
- is_active: BOOLEAN
- resolved_at: TIMESTAMP
- metadata: JSONB
- created_at, updated_at: TIMESTAMP
```

#### 7. model_metrics
```sql
- id: SERIAL PRIMARY KEY
- model_type: ENUM ('LSTM', 'Prophet', 'XGBoost')
- target_variable: ENUM ('energy', 'water', 'dam')
- rmse: FLOAT
- mae: FLOAT
- mape: FLOAT
- r2_score: FLOAT
- training_samples: INTEGER
- testing_samples: INTEGER
- training_date: TIMESTAMP
- version: VARCHAR(50)
- parameters: JSONB
- status: ENUM ('active', 'deprecated', 'testing')
- created_at, updated_at: TIMESTAMP
```

---

## 🤖 Makine Öğrenmesi Modelleri

### 1. LSTM (Long Short-Term Memory)

#### Kullanım Alanları
- Güneş enerjisi üretimi tahmini
- Su tüketimi trendi analizi
- Baraj seviyesi tahminleri

#### Özellikler
- **Lookback Period**: 30 gün
- **Hidden Units**: 64 (1. katman), 32 (2. katman)
- **Dropout**: 0.2
- **Activation**: ReLU
- **Optimizer**: Adam
- **Learning Rate**: 0.001
- **Batch Size**: 32
- **Epochs**: 100 (early stopping ile)

#### Bağımlı ve Bağımsız Değişkenler
**Enerji Modeli:**
- Bağımlı: `energy_produced` (MWh)
- Bağımsız: `solar_radiation`, `temperature`, `humidity`, `wind_speed`

**Su Modeli:**
- Bağımlı: `consumption` (m³)
- Bağımsız: `rainfall`, `temperature`, `population`, geçmiş tüketim

**Baraj Modeli:**
- Bağımlı: `fill_percentage` (%)
- Bağımsız: `inflow`, `outflow`, `rainfall`, `temperature`

### 2. Prophet

#### Kullanım Alanları
- Mevsimsel trend analizi
- Tatil ve özel günlerin etkisi
- Uzun vadeli tahminler

#### Özellikler
- **Changepoint Prior Scale**: 0.05
- **Seasonality Prior Scale**: 10
- **Seasonality Mode**: Multiplicative
- **Yearly Seasonality**: True
- **Weekly Seasonality**: True
- **Daily Seasonality**: False

### 3. XGBoost

#### Kullanım Alanları
- Hızlı tahminler
- Feature importance analizi
- Ensemble model

#### Özellikler
- **N Estimators**: 100
- **Max Depth**: 6
- **Learning Rate**: 0.1
- **Objective**: reg:squarederror
- **Min Child Weight**: 1

---

## ⚙️ Optimizasyon Algoritmaları

### 1. Doğrusal Programlama (Linear Programming)

#### Amaç Fonksiyonu
```
Minimize: Total_Cost = (Energy_Cost × Energy_Used) + (Water_Cost × Water_Used)

Subject to:
- Energy_Demand ≤ Energy_Supply (Solar + Grid)
- Water_Demand ≤ Water_Supply (Dam + Network)
- Dam_Level ≥ Min_Safe_Level
- Solar_Production ≤ Max_Capacity
- Energy_Used, Water_Used ≥ 0
```

#### Kısıtlamalar
- Enerji arz-talep dengesi
- Su kaynaklarının sürdürülebilirliği
- Baraj güvenlik seviyeleri
- Maksimum kapasite limitleri

### 2. Genetik Algoritma

#### Parametreler
- **Population Size**: 100
- **Generations**: 1000
- **Crossover Rate**: 0.8
- **Mutation Rate**: 0.1
- **Selection Method**: Tournament

#### Fitness Fonksiyonu
```
Fitness = w1 × Efficiency + w2 × (1 - Cost_Ratio) + w3 × Sustainability

Where:
- Efficiency: Kaynak kullanım verimliliği
- Cost_Ratio: Normalize edilmiş maliyet
- Sustainability: Sürdürülebilirlik skoru
- w1, w2, w3: Ağırlık katsayıları
```

---

## 📅 Proje Takvimi (14 Hafta)

### Faz 1: Veri Toplama ve İşleme (1-4. Haftalar)

#### Hafta 1-2: Veri Kaynaklarını Kurma
- [x] NASA POWER API entegrasyonu
- [x] Database schema tasarımı ve oluşturulması
- [ ] DSİ veri formatını belirleme
- [ ] MGM API başvurusu
- [ ] TÜİK veri setlerini indirme

#### Hafta 3-4: Veri Temizleme ve Hazırlama
- [ ] Eksik veri analizi ve imputation
- [ ] Outlier tespiti ve temizleme
- [ ] Feature engineering (lag, rolling mean, vb.)
- [ ] Veri normalizasyonu (MinMaxScaler)
- [ ] Train-test split (%70-%30)

### Faz 2: Model Geliştirme (5-9. Haftalar)

#### Hafta 5-6: LSTM Modeli
- [ ] LSTM mimarisi tasarımı
- [ ] Enerji tahmini modeli eğitimi
- [ ] Su tüketimi modeli eğitimi
- [ ] Baraj doluluk modeli eğitimi
- [ ] Hyperparameter tuning (Grid Search)

#### Hafta 7: Prophet Modeli
- [ ] Prophet model yapılandırması
- [ ] Seasonality analizi
- [ ] Tatil ve özel günlerin eklenmesi
- [ ] Model eğitimi ve değerlendirmesi

#### Hafta 8: XGBoost Modeli
- [ ] XGBoost model oluşturma
- [ ] Feature importance analizi
- [ ] Model eğitimi ve tuning
- [ ] Ensemble model denemesi

#### Hafta 9: Model Karşılaştırması
- [ ] Tüm modellerin performans metrikleri
- [ ] RMSE, MAE, MAPE, R² karşılaştırması
- [ ] En iyi model seçimi
- [ ] Model dokümantasyonu

### Faz 3: Optimizasyon (10-12. Haftalar)

#### Hafta 10: Doğrusal Programlama
- [ ] LP problem formülasyonu
- [ ] Kısıtlamaların tanımlanması
- [ ] Solver entegrasyonu (SciPy)
- [ ] Test senaryoları

#### Hafta 11: Genetik Algoritma
- [ ] GA implementasyonu
- [ ] Fitness fonksiyonu tasarımı
- [ ] Parametre optimizasyonu
- [ ] LP ile karşılaştırma

#### Hafta 12: Senaryo Analizi
- [ ] 5 temel senaryo tanımlama
- [ ] Senaryo parametrelerini belirleme
- [ ] Optimizasyon sonuçları
- [ ] Recommendations engine

### Faz 4: Dashboard ve Finalizasyon (13-14. Haftalar)

#### Hafta 13: Dashboard Geliştirme
- [ ] React componentleri
- [ ] Recharts entegrasyonu
- [ ] Real-time veri güncellemeleri
- [ ] Responsive tasarım
- [ ] Alert sistemi UI

#### Hafta 14: Test ve Deployment
- [ ] Integration testleri
- [ ] Performance optimizasyonu
- [ ] Dokümantasyon tamamlama
- [ ] User guide hazırlama
- [ ] Final deployment

---

## 📈 Başarı Metrikleri

### Model Performance (Hedefler)
- **RMSE**: < %15 of mean value
- **MAE**: < %10 of mean value
- **MAPE**: < %15
- **R² Score**: > 0.85

### Sistem Performance
- **API Response Time**: < 200ms (p95)
- **Dashboard Load Time**: < 2s
- **Prediction Latency**: < 5s
- **Database Query Time**: < 100ms

### İş Değeri
- **Tahmin Doğruluğu**: ≥ %85
- **Optimizasyon Verimliliği**: ≥ %20 iyileştirme
- **Erken Uyarı Hassasiyeti**: ≥ %90
- **Kullanıcı Memnuniyeti**: ≥ 4/5

---

## 🎓 Bilimsel Katkı

### Literatürdeki Boşluklar
1. **Entegre Enerji-Su Yönetimi**: Mevcut çalışmalar genelde ayrı ayrı
2. **Baraj Doluluk Öngörüsü**: Yeterli AI tabanlı çalışma yok
3. **Türkiye Özelinde Veri**: Lokal koşullara özel model eksikliği
4. **Gerçek Zamanlı Optimizasyon**: Teorik çalışmalar var, pratik uygulama az

### Bu Projenin Katkıları
- ✅ İlk entegre enerji-su-baraj yönetim platformu
- ✅ Çok kaynaklı veri entegrasyonu (NASA, DSİ, MGM, TÜİK)
- ✅ 3 farklı AI modelinin karşılaştırmalı analizi
- ✅ İki farklı optimizasyon yaklaşımının değerlendirilmesi
- ✅ Türkiye'ye özel veri seti ve model
- ✅ Açık kaynak platform (topluluk katkısı için)

### Potansiyel Yayınlar
1. "Integrated AI-based Energy-Water Resource Management Platform for Turkey"
2. "Comparative Analysis of LSTM, Prophet, and XGBoost for Solar Energy Prediction"
3. "Dam Level Forecasting Using Deep Learning: A Case Study in Turkey"

---

## 🌟 Uygulama Alanları

### Kamu Kurumları
- **DSİ**: Baraj operasyon planlaması
- **EPDK**: Enerji piyasası düzenlemeleri
- **Belediyeler**: Şehir su yönetimi
- **İl Özel İdareleri**: Bölgesel planlama

### Özel Sektör
- **Enerji Şirketleri**: Üretim optimizasyonu
- **Su Üreten Şirketler**: Talep tahmini
- **Tarım İşletmeleri**: Sulama planlaması
- **Danışmanlık Firmaları**: Karar destek sistemi

### Akademik Araştırma
- **Üniversiteler**: Eğitim ve araştırma platformu
- **Araştırma Merkezleri**: Veri ve model paylaşımı
- **Lisansüstü Çalışmalar**: Tez konusu

---

## 📝 Lisans ve Kullanım



**Kullanım Şartları**:
- Ticari ve akademik kullanım serbesttir
- Kaynak belirtilmelidir
- Katkılar açık kaynak olarak paylaşılmalıdır

---

**Geliştirici**: Enerji-Su Platformu Ekibi  
**Versiyon**: 1.0.0  
**Son Güncelleme**: Kasım 2025
