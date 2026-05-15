import { Router } from 'express';
import damController from '../controllers/damController';

const router = Router();

/**
 * @swagger
 * /dams:
 *   get:
 *     summary: Tüm barajları getir
 *     tags: [Dams]
 *     responses:
 *       200:
 *         description: Başarıyla alındı
 */
router.get('/', damController.getAll.bind(damController));

/**
 * @swagger
 * /dams/{id}:
 *   get:
 *     summary: Barajı ID'ye göre getir
 *     tags: [Dams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Başarıyla alındı
 *       404:
 *         description: Baraj bulunamadı
 */
router.get('/:id', damController.getById.bind(damController));

/**
 * @swagger
 * /dams/stats:
 *   get:
 *     summary: Baraj istatistiklerini getir
 *     tags: [Dams]
 *     responses:
 *       200:
 *         description: İstatistikler başarıyla alındı
 */
router.get('/stats/overview', damController.getStats.bind(damController));

/**
 * @swagger
 * /dams:
 *   post:
 *     summary: Yeni baraj ekle
 *     tags: [Dams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               capacity:
 *                 type: number
 *               currentLevel:
 *                 type: number
 *               inflow:
 *                 type: number
 *               outflow:
 *                 type: number
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Baraj başarıyla eklendi
 */
router.post('/', damController.create.bind(damController));

/**
 * @swagger
 * /dams/{id}:
 *   put:
 *     summary: Barajı güncelle
 *     tags: [Dams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Baraj başarıyla güncellendi
 *       404:
 *         description: Baraj bulunamadı
 */
router.put('/:id', damController.update.bind(damController));

/**
 * @swagger
 * /dams/{id}:
 *   delete:
 *     summary: Barajı sil
 *     tags: [Dams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Baraj başarıyla silindi
 *       404:
 *         description: Baraj bulunamadı
 */
router.delete('/:id', damController.delete.bind(damController));

export default router;
