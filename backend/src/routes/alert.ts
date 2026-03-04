import { Router } from 'express';
import alertController from '../controllers/alertController';

const router = Router();

/**
 * @swagger
 * /alerts:
 *   get:
 *     summary: Tüm uyarıları getir
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: Başarıyla alındı
 */
router.get('/', alertController.getAll.bind(alertController));

/**
 * @swagger
 * /alerts/active:
 *   get:
 *     summary: Aktif uyarıları getir
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: Başarıyla alındı
 */
router.get('/active', alertController.getActive.bind(alertController));

/**
 * @swagger
 * /alerts:
 *   post:
 *     summary: Yeni uyarı oluştur
 *     tags: [Alerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Uyarı başarıyla oluşturuldu
 */
router.post('/', alertController.create.bind(alertController));

/**
 * @swagger
 * /alerts/{id}/resolve:
 *   patch:
 *     summary: Uyarıyı çöz
 *     tags: [Alerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Uyarı başarıyla çözüldü
 */
router.patch('/:id/resolve', alertController.resolve.bind(alertController));

export default router;
