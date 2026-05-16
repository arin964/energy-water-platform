import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { config } from '../config/env';
import { Energy } from '../models/Energy';
import { Water } from '../models/Water';
import { Op } from 'sequelize';

export class OptimizationController {
  // Get monthly savings calculation
  async getMonthlySavings(req: Request, res: Response, next: NextFunction) {
    try {
      // Bugünün ayını al
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Ayın başı ve sonunu hesapla
      const monthStart = new Date(currentYear, currentMonth, 1);
      const monthEnd = new Date(currentYear, currentMonth + 1, 0);

      // Aylık enerji verilerini çek
      const energyData = await Energy.findAll({
        where: {
          timestamp: {
            [Op.between]: [monthStart, monthEnd],
          },
        },
        raw: true,
      });

      // Aylık su verilerini çek
      const waterData = await Water.findAll({
        where: {
          timestamp: {
            [Op.between]: [monthStart, monthEnd],
          },
        },
        raw: true,
      });

      // Tasarrufu hesapla
      let totalEnergy = 0;
      let totalWater = 0;
      let energySavings = 0;
      let waterSavings = 0;
      let costSavings = 0;

      // Enerji hesaplaması
      if (energyData.length > 0) {
        totalEnergy = energyData.reduce((sum, item) => sum + (item.energyProduced || 0), 0);
        // Standart verimli operasyon %15 tasarruf yapabilir
        energySavings = Math.round((totalEnergy * 0.15 * 100) / totalEnergy);
        costSavings += totalEnergy * 0.15 * 0.15 * 1000; // Heuristic maliyet
      }

      // Su hesaplaması
      if (waterData.length > 0) {
        totalWater = waterData.reduce((sum, item) => sum + (item.consumption || 0), 0);
        // Standart verimli operasyon %12 tasarruf yapabilir
        waterSavings = Math.round((totalWater * 0.12 * 100) / totalWater);
        costSavings += (totalWater * 0.12 / 1000) * 50; // Su fiyatı: 50 TL/1000m³
      }

      res.json({
        success: true,
        data: {
          month: monthStart.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
          energySavings,
          waterSavings,
          totalEnergy: Math.round(totalEnergy),
          totalWater: Math.round(totalWater),
          costSavings: Math.round(costSavings),
          dataPointsCount: energyData.length + waterData.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Get optimization recommendations
  async getRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const { days = 7 } = req.query;
      
      // Call ML service for optimization
      const response = await axios.post(`${config.mlService.url}/optimize`, {
        days: parseInt(days as string, 10),
      });
      
      res.json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Get best time for water treatment
  async getBestTimeForWaterTreatment(req: Request, res: Response, next: NextFunction) {
    try {
      const { date } = req.query;
      
      const response = await axios.post(`${config.mlService.url}/optimize/water-treatment`, {
        date: date || new Date().toISOString(),
      });
      
      res.json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Run what-if scenario
  async runScenario(req: Request, res: Response, next: NextFunction) {
    try {
      const { scenario, parameters } = req.body;
      
      const response = await axios.post(`${config.mlService.url}/scenario`, {
        scenario,
        parameters,
      });
      
      res.json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new OptimizationController();
