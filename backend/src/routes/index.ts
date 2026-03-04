import { Router } from 'express';
import energyRoutes from './energy';
import waterRoutes from './water';
import forecastRoutes from './forecast';
import optimizationRoutes from './optimization';
import alertRoutes from './alert';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: API sağlık durumunu kontrol et
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API çalışıyor
 */
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Energy-Water API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use('/energy', energyRoutes);
router.use('/water', waterRoutes);
router.use('/forecast', forecastRoutes);
router.use('/optimization', optimizationRoutes);
router.use('/alerts', alertRoutes);

export default router;
