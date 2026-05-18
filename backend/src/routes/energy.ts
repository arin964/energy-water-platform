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
 * /energy/sources:
 *   get:
 *     summary: Kaynağa göre enerji üretim toplamını getir (Son 30 gün)
 *     tags: [Energy]
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Kaç günlük veri gösterilecek
 *     responses:
 *       200:
 *         description: Kaynağa göre toplam başarıyla alındı
 */
router.get('/sources', energyController.getSources.bind(energyController));

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

/**
 * @swagger
 * /energy/{id}:
 *   delete:
 *     summary: ID'ye göre enerji verisi sil
 *     tags: [Energy]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Enerji verisi başarıyla silindi
 */
router.delete('/:id', energyController.delete.bind(energyController));

/**
 * @swagger
 * /energy/remove/bySourceAndDate:
 *   delete:
 *     summary: Tarih ve kaynağa göre enerji verilerini sil
 *     tags: [Energy]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: "2026-05-18"
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *           enum: [Solar, Wind, Hydro, Other]
 *     responses:
 *       200:
 *         description: Veriler başarıyla silindi
 */
router.delete('/remove/bySourceAndDate', energyController.deleteBySourceAndDate.bind(energyController));

export default router;
