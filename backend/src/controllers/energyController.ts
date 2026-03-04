import { Request, Response, NextFunction } from 'express';
import { Energy } from '../models/Energy';
import { Op } from 'sequelize';

export class EnergyController {
  // Get all energy data with filters
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, location } = req.query;
      
      const where: any = {};
      
      if (startDate && endDate) {
        where.timestamp = {
          [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
        };
      }
      
      if (location) {
        where.location = location;
      }
      
      const data = await Energy.findAll({
        where,
        order: [['timestamp', 'DESC']],
        limit: 1000,
      });
      
      res.json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Get latest energy data
  async getLatest(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Energy.findOne({
        order: [['timestamp', 'DESC']],
      });
      
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Get statistics
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      
      const where: any = {};
      if (startDate && endDate) {
        where.timestamp = {
          [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
        };
      }
      
      const data = await Energy.findAll({ where });
      
      const stats = {
        totalProduction: data.reduce((sum, item) => sum + (item.energyProduced || 0), 0),
        avgSolarRadiation: data.reduce((sum, item) => sum + (item.solarRadiation || 0), 0) / data.length,
        avgTemperature: data.reduce((sum, item) => sum + (item.temperature || 0), 0) / data.length,
        maxProduction: data.length > 0 ? Math.max(...data.map(item => item.energyProduced || 0)) : 0,
        minProduction: data.length > 0 ? Math.min(...data.map(item => item.energyProduced || 0)) : 0,
      };
      
      res.json({
        success: true,
        stats,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Create new energy data
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Energy.create(req.body);
      
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new EnergyController();
