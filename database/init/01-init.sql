-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create energy_data table
CREATE TABLE IF NOT EXISTS energy_data (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    solar_radiation FLOAT NOT NULL,
    temperature FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    wind_speed FLOAT NOT NULL,
    energy_produced FLOAT NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create water_data table
CREATE TABLE IF NOT EXISTS water_data (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    consumption FLOAT NOT NULL,
    sector VARCHAR(50) CHECK (sector IN ('domestic', 'industrial', 'agricultural', 'other')),
    region VARCHAR(255) NOT NULL,
    population INTEGER NOT NULL,
    rainfall FLOAT NOT NULL,
    temperature FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create dam_data table
CREATE TABLE IF NOT EXISTS dam_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    capacity FLOAT NOT NULL,
    current_level FLOAT NOT NULL,
    fill_percentage FLOAT NOT NULL,
    inflow FLOAT NOT NULL,
    outflow FLOAT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create forecasts table
CREATE TABLE IF NOT EXISTS forecasts (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) CHECK (type IN ('energy', 'water', 'dam')),
    target_date TIMESTAMP NOT NULL,
    predicted_value FLOAT NOT NULL,
    confidence FLOAT NOT NULL,
    model_used VARCHAR(100) NOT NULL,
    parameters JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) CHECK (type IN ('warning', 'critical', 'info')),
    category VARCHAR(50) CHECK (category IN ('energy', 'water', 'dam', 'optimization')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    severity INTEGER NOT NULL CHECK (severity BETWEEN 1 AND 10),
    is_active BOOLEAN DEFAULT TRUE,
    resolved_at TIMESTAMP,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create optimization_scenarios table
CREATE TABLE IF NOT EXISTS optimization_scenarios (
    id SERIAL PRIMARY KEY,
    scenario_name VARCHAR(255) NOT NULL,
    scenario_type VARCHAR(50) CHECK (scenario_type IN ('low_rainfall', 'high_demand', 'low_solar', 'peak_hours', 'drought', 'custom')),
    target_date TIMESTAMP NOT NULL,
    energy_demand FLOAT NOT NULL,
    water_demand FLOAT NOT NULL,
    solar_capacity FLOAT NOT NULL,
    dam_level FLOAT NOT NULL,
    optimized_energy_allocation FLOAT NOT NULL,
    optimized_water_allocation FLOAT NOT NULL,
    efficiency FLOAT NOT NULL,
    cost FLOAT NOT NULL,
    parameters JSONB DEFAULT '{}',
    recommendations TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create model_metrics table
CREATE TABLE IF NOT EXISTS model_metrics (
    id SERIAL PRIMARY KEY,
    model_type VARCHAR(20) CHECK (model_type IN ('LSTM', 'Prophet')),
    target_variable VARCHAR(20) CHECK (target_variable IN ('energy', 'water', 'dam')),
    rmse FLOAT NOT NULL,
    mae FLOAT NOT NULL,
    mape FLOAT NOT NULL,
    r2_score FLOAT NOT NULL,
    training_samples INTEGER NOT NULL,
    testing_samples INTEGER NOT NULL,
    training_date TIMESTAMP NOT NULL,
    version VARCHAR(50) NOT NULL,
    parameters JSONB DEFAULT '{}',
    status VARCHAR(20) CHECK (status IN ('active', 'deprecated', 'testing')) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_energy_timestamp ON energy_data(timestamp);
CREATE INDEX idx_energy_location ON energy_data(location);

CREATE INDEX idx_water_timestamp ON water_data(timestamp);
CREATE INDEX idx_water_sector ON water_data(sector);
CREATE INDEX idx_water_region ON water_data(region);

CREATE INDEX idx_dam_name ON dam_data(name);
CREATE INDEX idx_dam_timestamp ON dam_data(timestamp);

CREATE INDEX idx_forecast_type ON forecasts(type);
CREATE INDEX idx_forecast_target_date ON forecasts(target_date);

CREATE INDEX idx_alert_type ON alerts(type);
CREATE INDEX idx_alert_category ON alerts(category);
CREATE INDEX idx_alert_active ON alerts(is_active);

CREATE INDEX idx_optimization_type ON optimization_scenarios(scenario_type);
CREATE INDEX idx_optimization_target_date ON optimization_scenarios(target_date);
CREATE INDEX idx_optimization_status ON optimization_scenarios(status);

CREATE INDEX idx_model_type_target ON model_metrics(model_type, target_variable);
CREATE INDEX idx_model_status ON model_metrics(status);

-- Insert 30 days of realistic energy data with seasonal variation
INSERT INTO energy_data (timestamp, solar_radiation, temperature, humidity, wind_speed, energy_produced, location, latitude, longitude)
SELECT 
    NOW() - INTERVAL '1 day' * (generate_series(0, 29)),
    750 + RANDOM() * 200 - 100 + 50 * SIN(generate_series(0, 29) * 0.2),
    25 + RANDOM() * 10 + 5 * SIN(generate_series(0, 29) * 0.1),
    50 + RANDOM() * 30,
    3 + RANDOM() * 4,
    50 + RANDOM() * 15 + 10 * SIN(generate_series(0, 29) * 0.15),
    'Ankara',
    39.9334,
    32.8597;

-- Insert 30 days of realistic water data
INSERT INTO water_data (timestamp, consumption, sector, region, population, rainfall, temperature)
SELECT 
    NOW() - INTERVAL '1 day' * i,
    44000 + RANDOM() * 8000 + 3000 * SIN(i * 0.1),
    CASE WHEN (i % 3) = 0 THEN 'domestic' 
         WHEN (i % 3) = 1 THEN 'industrial' 
         ELSE 'agricultural' END,
    'Ankara',
    5500000,
    RANDOM() * 5,
    25 + RANDOM() * 10 + 5 * SIN(i * 0.1)
FROM generate_series(0, 29) AS t(i);

-- Insert dam data with realistic levels
INSERT INTO dam_data (timestamp, name, location, capacity, current_level, fill_percentage, inflow, outflow, latitude, longitude)
SELECT 
    NOW() - INTERVAL '1 day' * i,
    CASE i % 3
        WHEN 0 THEN 'Keban Barajı'
        WHEN 1 THEN 'Euphrates Dam'
        ELSE 'Melen Dam'
    END,
    CASE i % 3
        WHEN 0 THEN 'Elazığ'
        WHEN 1 THEN 'Gaziantep'
        ELSE 'Istanbul'
    END,
    CASE i % 3
        WHEN 0 THEN 32000
        WHEN 1 THEN 28000
        ELSE 15000
    END,
    CASE i % 3
        WHEN 0 THEN 32000 * (0.65 + RANDOM() * 0.20)
        WHEN 1 THEN 28000 * (0.60 + RANDOM() * 0.25)
        ELSE 15000 * (0.70 + RANDOM() * 0.15)
    END,
    (RANDOM() * 20 + 60)::INT,
    1000 + RANDOM() * 500,
    500 + RANDOM() * 300,
    CASE i % 3
        WHEN 0 THEN 38.75
        WHEN 1 THEN 37.15
        ELSE 41.20
    END,
    CASE i % 3
        WHEN 0 THEN 39.50
        WHEN 1 THEN 37.95
        ELSE 28.90
    END
FROM generate_series(0, 29) AS t(i);

INSERT INTO alerts (type, category, title, message, severity)
VALUES 
    ('warning', 'dam', 'Baraj Seviyesi Düşüyor', 'Keban Barajı doluluk oranı %75 altına düştü', 6),
    ('info', 'energy', 'Yüksek Üretim Bekleniyor', 'Gelecek hafta güneş radyasyonu ortalamanın üzerinde', 3),
    ('critical', 'water', 'Yüksek Tüketim Uyarısı', 'Su tüketimi son 3 günde %15 arttı', 8);
