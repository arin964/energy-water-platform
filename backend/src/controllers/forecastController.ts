import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { config } from '../config/env';
import { Forecast } from '../models/Forecast';

export class ForecastController {
  // Get energy forecast from ML service
  async getEnergyForecast(req: Request, res: Response, next: NextFunction) {
    try {
      const { days = 7 } = req.query;
      
      // Call ML service
      const response = await axios.post(`${config.mlService.url}/predict/energy`, {
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
  
  // Get water forecast from ML service
  async getWaterForecast(req: Request, res: Response, next: NextFunction) {
    try {
      const { days = 7 } = req.query;
      
      const response = await axios.post(`${config.mlService.url}/predict/water`, {
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
  
  // Get dam level forecast
  async getDamForecast(req: Request, res: Response, next: NextFunction) {
    try {
      const { days = 7, damId } = req.query;
      
      const response = await axios.post(`${config.mlService.url}/predict/dam`, {
        days: parseInt(days as string, 10),
        damId,
      });
      
      res.json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Get all saved forecasts
  async getAllForecasts(req: Request, res: Response, next: NextFunction) {
    try {
      const { type } = req.query;
      
      const where: any = {};
      if (type) {
        where.type = type;
      }
      
      const forecasts = await Forecast.findAll({
        where,
        order: [['targetDate', 'ASC']],
        limit: 100,
      });
      
      res.json({
        success: true,
        count: forecasts.length,
        data: forecasts,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ForecastController();
