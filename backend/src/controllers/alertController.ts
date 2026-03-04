import { Request, Response, NextFunction } from 'express';
import { Alert } from '../models/Alert';

export class AlertController {
  // Get all alerts
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { isActive, type, category } = req.query;
      
      const where: any = {};
      
      if (isActive !== undefined) {
        where.isActive = isActive === 'true';
      }
      
      if (type) {
        where.type = type;
      }
      
      if (category) {
        where.category = category;
      }
      
      const alerts = await Alert.findAll({
        where,
        order: [['createdAt', 'DESC']],
        limit: 100,
      });
      
      res.json({
        success: true,
        count: alerts.length,
        data: alerts,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Get active alerts
  async getActive(req: Request, res: Response, next: NextFunction) {
    try {
      const alerts = await Alert.findAll({
        where: { isActive: true },
        order: [['severity', 'DESC'], ['createdAt', 'DESC']],
      });
      
      res.json({
        success: true,
        count: alerts.length,
        data: alerts,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Create new alert
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const alert = await Alert.create(req.body);
      
      res.status(201).json({
        success: true,
        data: alert,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Resolve alert
  async resolve(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const alert = await Alert.findByPk(id);
      
      if (!alert) {
        return res.status(404).json({
          success: false,
          message: 'Alert not found',
        });
      }
      
      alert.isActive = false;
      alert.resolvedAt = new Date();
      await alert.save();
      
      return res.json({
        success: true,
        data: alert,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AlertController();
