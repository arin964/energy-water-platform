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
