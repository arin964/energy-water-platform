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
  
  // Get energy production by source (Son 30 gün)
  async getSources(req: Request, res: Response, next: NextFunction) {
    try {
      const { days = 30 } = req.query;
      
      // Son N günü hesapla
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - parseInt(days as string));
      
      const where: any = {
        timestamp: {
          [Op.between]: [startDate, endDate],
        },
      };
      
      // Kaynağa göre toplam üretim
      const data = await Energy.findAll({
        where,
        raw: true,
      });
      
      // Kaynağa göre gruplandır
      const sourceData: Record<string, number> = {
        Solar: 0,
        Wind: 0,
        Hydro: 0,
        Other: 0,
      };
      
      data.forEach((item: any) => {
        const source = item.source || 'Other';
        sourceData[source] += item.energyProduced || 0;
      });
      
      // Toplam hesapla
      const total = Object.values(sourceData).reduce((sum, val) => sum + val, 0);
      
      // Yüzde hesapla
      const sources = Object.entries(sourceData)
        .map(([name, value]) => ({
          source: name,
          value: Math.round(value * 100) / 100,
          percentage: total > 0 ? Math.round((value / total) * 100) : 0,
        }))
        .sort((a, b) => b.value - a.value);
      
      res.json({
        success: true,
        period: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          days: parseInt(days as string),
        },
        total: Math.round(total * 100) / 100,
        sources,
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

  // Delete energy data by ID
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const energy = await Energy.findByPk(id);
      if (!energy) {
        return res.status(404).json({
          success: false,
          message: 'Enerji verisi bulunamadı',
        });
      }
      
      await energy.destroy();
      
      res.json({
        success: true,
        message: 'Enerji verisi başarıyla silindi',
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete multiple energy records by source and date
  async deleteBySourceAndDate(req: Request, res: Response, next: NextFunction) {
    try {
      const { date, source } = req.query;
      
      const where: any = {};
      if (date) {
        const dateStart = new Date(date as string);
        const dateEnd = new Date(dateStart);
        dateEnd.setDate(dateEnd.getDate() + 1);
        
        where.timestamp = {
          [Op.between]: [dateStart, dateEnd],
        };
      }
      
      if (source) {
        where.source = source;
      }
      
      const result = await Energy.destroy({ where });
      
      res.json({
        success: true,
        message: `${result} kayıt silindi`,
        deletedCount: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new EnergyController();
