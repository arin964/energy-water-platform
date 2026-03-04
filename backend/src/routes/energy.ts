import { Router } from 'express';
import energyController from '../controllers/energyController';

const router = Router();

/**
 * @swagger
 * /energy:
 *   get:
 *     summary: Tüm enerji verilerini getir
 *     tags: [Energy]
 *     responses:
 *       200:
 *         description: Başarıyla alındı
 */
router.get('/', energyController.getAll.bind(energyController));

/**
 * @swagger
 * /energy/latest:
 *   get:
 *     summary: En son enerji verilerini getir
 *     tags: [Energy]
 *     responses:
 *       200:
 *         description: Başarıyla alındı
 */
router.get('/latest', energyController.getLatest.bind(energyController));

/**
 * @swagger
 * /energy/stats:
 *   get:
 *     summary: Enerji istatistiklerini getir
 *     tags: [Energy]
 *     responses:
 *       200:
 *         description: İstatistikler başarıyla alındı
 */
router.get('/stats', energyController.getStats.bind(energyController));

/**
 * @swagger
 * /energy:
 *   post:
 *     summary: Yeni enerji verisi ekle
 *     tags: [Energy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Enerji verisi başarıyla eklendi
 */
router.post('/', energyController.create.bind(energyController));

export default router;
