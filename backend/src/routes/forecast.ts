import { Router } from 'express';
import forecastController from '../controllers/forecastController';

const router = Router();

/**
 * @swagger
 * /forecast/energy:
 *   get:
 *     summary: Enerji tahmini al
 *     tags: [Forecast]
 *     responses:
 *       200:
 *         description: Enerji tahmini başarıyla alındı
 */
router.get('/energy', forecastController.getEnergyForecast.bind(forecastController));

/**
 * @swagger
 * /forecast/water:
 *   get:
 *     summary: Su tahmini al
 *     tags: [Forecast]
 *     responses:
 *       200:
 *         description: Su tahmini başarıyla alındı
 */
router.get('/water', forecastController.getWaterForecast.bind(forecastController));

/**
 * @swagger
 * /forecast/dam:
 *   get:
 *     summary: Baraj tahmini al
 *     tags: [Forecast]
 *     responses:
 *       200:
 *         description: Baraj tahmini başarıyla alındı
 */
router.get('/dam', forecastController.getDamForecast.bind(forecastController));

/**
 * @swagger
 * /forecast/all:
 *   get:
 *     summary: Tüm tahminleri al
 *     tags: [Forecast]
 *     responses:
 *       200:
 *         description: Tüm tahminler başarıyla alındı
 */
router.get('/all', forecastController.getAllForecasts.bind(forecastController));

export default router;
