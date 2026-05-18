import { Router } from 'express';
import waterController from '../controllers/waterController';

const router = Router();

/**
 * @swagger
 * /water:
 *   get:
 *     summary: Tüm su verilerini getir
 *     tags: [Water]
 *     responses:
 *       200:
 *         description: Başarıyla alındı
 */
router.get('/', waterController.getAll.bind(waterController));

/**
 * @swagger
 * /water/by-sector:
 *   get:
 *     summary: Sektöre göre su verilerini getir
 *     tags: [Water]
 *     responses:
 *       200:
 *         description: Başarıyla alındı
 */
router.get('/by-sector', waterController.getBySector.bind(waterController));

/**
 * @swagger
 * /water/stats:
 *   get:
 *     summary: Su istatistiklerini getir
 *     tags: [Water]
 *     responses:
 *       200:
 *         description: İstatistikler başarıyla alındı
 */
router.get('/stats', waterController.getStats.bind(waterController));

/**
 * @swagger
 * /water/conservation-program:
 *   get:
 *     summary: Su tasarruf programı istatistikleri
 *     tags: [Water]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tasarruf istatistikleri başarıyla alındı
 */
router.get('/conservation-program', waterController.getConservationProgram.bind(waterController));

/**
 * @swagger
 * /water/conservation-program:
 *   post:
 *     summary: Su tasarruf programını başlat
 *     tags: [Water]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetReduction:
 *                 type: number
 *                 description: Hedeflenen tasarruf yüzdesi (default 20)
 *     responses:
 *       201:
 *         description: Program başarıyla başlatıldı
 */
router.post('/conservation-program', waterController.startConservationProgram.bind(waterController));

/**
 * @swagger
 * /water:
 *   post:
 *     summary: Yeni su verisi ekle
 *     tags: [Water]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Su verisi başarıyla eklendi
 */
router.post('/', waterController.create.bind(waterController));

export default router;
