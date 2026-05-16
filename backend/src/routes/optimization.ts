import { Router } from 'express';
import optimizationController from '../controllers/optimizationController';

const router = Router();

/**
 * @swagger
 * /optimization/savings:
 *   get:
 *     summary: Aylık tasarruf hesapla
 *     tags: [Optimization]
 *     responses:
 *       200:
 *         description: Aylık tasarruf verileri
 */
router.get('/savings', optimizationController.getMonthlySavings.bind(optimizationController));

/**
 * @swagger
 * /optimization/recommendations:
 *   get:
 *     summary: Optimizasyon önerilerini al
 *     tags: [Optimization]
 *     responses:
 *       200:
 *         description: Öneriler başarıyla alındı
 */
router.get('/recommendations', optimizationController.getRecommendations.bind(optimizationController));

/**
 * @swagger
 * /optimization/water-treatment:
 *   get:
 *     summary: Su arıtımı için en iyi zamanı bul
 *     tags: [Optimization]
 *     responses:
 *       200:
 *         description: Başarıyla alındı
 */
router.get('/water-treatment', optimizationController.getBestTimeForWaterTreatment.bind(optimizationController));

/**
 * @swagger
 * /optimization/scenario:
 *   post:
 *     summary: Senaryo analizi çalıştır
 *     tags: [Optimization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Senaryo başarıyla çalıştırıldı
 */
router.post('/scenario', optimizationController.runScenario.bind(optimizationController));

export default router;
