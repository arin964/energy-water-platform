import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { config } from '../config/env';

export class OptimizationController {
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
