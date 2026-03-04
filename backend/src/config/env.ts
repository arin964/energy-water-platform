import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    database: process.env.POSTGRES_DB || 'energy_water_db',
    username: process.env.POSTGRES_USER || 'admin',
    password: process.env.POSTGRES_PASSWORD || 'admin123',
    dialect: 'postgres' as const,
    logging: process.env.NODE_ENV === 'development',
  },
  
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
  
  mlService: {
    url: process.env.ML_SERVICE_URL || 'http://localhost:8000',
  },
  
  apiKeys: {
    nasa: process.env.NASA_API_KEY || 'DEMO_KEY',
    openWeather: process.env.OPENWEATHER_API_KEY || '',
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};
