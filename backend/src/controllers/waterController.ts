import { Request, Response, NextFunction } from 'express';
import { Water } from '../models/Water';
import { Op } from 'sequelize';

export class WaterController {
  // Get all water data with filters
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, sector, region } = req.query;
      
      const where: any = {};
      
      if (startDate && endDate) {
        where.timestamp = {
          [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
        };
      }
      
      if (sector) {
        where.sector = sector;
      }
      
      if (region) {
        where.region = region;
      }
      
      const data = await Water.findAll({
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
  
  // Get water consumption by sector
  async getBySector(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      
      const where: any = {};
      if (startDate && endDate) {
        where.timestamp = {
          [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
        };
      }
      
      const sectors = ['domestic', 'industrial', 'agricultural', 'other'];
      const result = await Promise.all(
        sectors.map(async (sector) => {
          const data = await Water.findAll({
            where: { ...where, sector },
          });
          
          return {
            sector,
            totalConsumption: data.reduce((sum, item) => sum + item.consumption, 0),
            avgConsumption: data.reduce((sum, item) => sum + item.consumption, 0) / data.length,
            count: data.length,
          };
        })
      );
      
      res.json({
        success: true,
        data: result,
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
      
      const data = await Water.findAll({ where });
      
      const stats = {
        totalConsumption: data.reduce((sum, item) => sum + item.consumption, 0),
        avgConsumption: data.reduce((sum, item) => sum + item.consumption, 0) / data.length,
        maxConsumption: Math.max(...data.map(item => item.consumption)),
        minConsumption: Math.min(...data.map(item => item.consumption)),
        avgRainfall: data.reduce((sum, item) => sum + item.rainfall, 0) / data.length,
      };
      
      res.json({
        success: true,
        stats,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Create new water data
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Water.create(req.body);
      
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new WaterController();
