import app from './app';
import { config } from './config/env';
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import logger from './utils/logger';
import alertService from './services/alertService';

const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Connect to Redis
    await connectRedis();
    
    // Start server
    app.listen(config.port, () => {
      logger.info(`🚀 Server is running on port ${config.port}`);
      logger.info(`📊 Environment: ${config.env}`);
      logger.info(`🔗 API: http://localhost:${config.port}/api`);
    });

    // Start alert check service (every 5 minutes)
    logger.info(`⏰ Alert check service started (interval: 5 minutes)`);
    
    // İlk kontrolü hemen çalıştır
    await alertService.checkAllAlerts();
    
    // Sonra her 5 dakikada bir çalıştır
    setInterval(async () => {
      try {
        await alertService.checkAllAlerts();
      } catch (error) {
        logger.error('Alert check error:', error);
      }
    }, 5 * 60 * 1000); // 5 dakika
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
