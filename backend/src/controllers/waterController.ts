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
  
  // Get water conservation program statistics
  async getConservationProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      
      const where: any = {};
      if (startDate && endDate) {
        where.timestamp = {
          [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
        };
      }
      
      const data = await Water.findAll({ where });
      
      if (data.length === 0) {
        return res.json({
          success: true,
          program: {
            status: 'no_data',
            totalConsumption: 0,
            targetConsumption: 0,
            savings: 0,
            savingsPercentage: 0,
            message: 'Veri bulunamadı',
          },
        });
      }
      
      const totalConsumption = data.reduce((sum, item) => sum + item.consumption, 0);
      const avgConsumption = totalConsumption / data.length;
      
      // Baseline: average consumption - 20% reduction target
      const targetConsumption = avgConsumption * 0.8;
      const savings = totalConsumption - (targetConsumption * data.length);
      const savingsPercentage = ((totalConsumption - (targetConsumption * data.length)) / totalConsumption) * 100;
      
      res.json({
        success: true,
        program: {
          status: 'active',
          period: {
            startDate,
            endDate,
          },
          totalConsumption: Math.round(totalConsumption * 100) / 100,
          avgConsumption: Math.round(avgConsumption * 100) / 100,
          targetConsumption: Math.round(targetConsumption * 100) / 100,
          savings: Math.round(savings * 100) / 100,
          savingsPercentage: Math.round(savingsPercentage * 100) / 100,
          recordsAnalyzed: data.length,
          message: `Su tasarrufu programı: %${Math.round(savingsPercentage * 100) / 100} tasarruf sağlandı`,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Start water conservation program
  async startConservationProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const { targetReduction = 20 } = req.body; // Default 20% reduction
      
      // Get last 30 days data as baseline
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const baselineData = await Water.findAll({
        where: {
          timestamp: {
            [Op.gte]: thirtyDaysAgo,
          },
        },
      });
      
      if (baselineData.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Baseline verileri bulunamadı',
        });
      }
      
      const baselineConsumption = baselineData.reduce((sum, item) => sum + item.consumption, 0) / baselineData.length;
      const targetConsumption = baselineConsumption * ((100 - targetReduction) / 100);
      
      res.status(201).json({
        success: true,
        program: {
          status: 'started',
          baselineConsumption: Math.round(baselineConsumption * 100) / 100,
          targetConsumption: Math.round(targetConsumption * 100) / 100,
          targetReductionPercentage: targetReduction,
          startDate: new Date().toISOString(),
          message: `Su tasarruf programı başlatıldı. Hedef: %${targetReduction} tasarruf`,
        },
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
