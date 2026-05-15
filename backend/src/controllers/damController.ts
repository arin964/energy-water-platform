import { Request, Response, NextFunction } from 'express';
import { Dam } from '../models/Dam';

export class DamController {
  // Get all dams
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Dam.findAll({
        order: [['id', 'ASC']],
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
  
  // Get dam by ID
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await Dam.findByPk(id);
      
      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Baraj bulunamadı',
        });
      }
      
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Create new dam
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, location, capacity, currentLevel, inflow, outflow, latitude, longitude } = req.body;
      
      // Validate required fields
      if (!name || !location || capacity === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Gerekli alanlar eksik',
        });
      }
      
      const fillPercentage = currentLevel ? (currentLevel / capacity) * 100 : 0;
      
      const data = await Dam.create({
        name,
        location,
        capacity,
        currentLevel: currentLevel || 0,
        fillPercentage,
        inflow: inflow || 0,
        outflow: outflow || 0,
        timestamp: new Date(),
        latitude: latitude || 0,
        longitude: longitude || 0,
      });
      
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Update dam
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, location, capacity, currentLevel, inflow, outflow, latitude, longitude } = req.body;
      
      const dam = await Dam.findByPk(id);
      
      if (!dam) {
        return res.status(404).json({
          success: false,
          message: 'Baraj bulunamadı',
        });
      }
      
      // Update fields
      if (name !== undefined) dam.name = name;
      if (location !== undefined) dam.location = location;
      if (capacity !== undefined) dam.capacity = capacity;
      if (currentLevel !== undefined) dam.currentLevel = currentLevel;
      if (inflow !== undefined) dam.inflow = inflow;
      if (outflow !== undefined) dam.outflow = outflow;
      if (latitude !== undefined) dam.latitude = latitude;
      if (longitude !== undefined) dam.longitude = longitude;
      
      // Recalculate fill percentage
      dam.fillPercentage = (dam.currentLevel / dam.capacity) * 100;
      dam.timestamp = new Date();
      
      await dam.save();
      
      res.json({
        success: true,
        data: dam,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Delete dam
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const dam = await Dam.findByPk(id);
      
      if (!dam) {
        return res.status(404).json({
          success: false,
          message: 'Baraj bulunamadı',
        });
      }
      
      await dam.destroy();
      
      res.json({
        success: true,
        message: 'Baraj başarıyla silindi',
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Get dam statistics
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const dams = await Dam.findAll();
      
      const stats = {
        totalDams: dams.length,
        totalCapacity: dams.reduce((sum, dam) => sum + dam.capacity, 0),
        totalCurrentLevel: dams.reduce((sum, dam) => sum + dam.currentLevel, 0),
        avgFillPercentage: dams.length > 0 
          ? dams.reduce((sum, dam) => sum + dam.fillPercentage, 0) / dams.length 
          : 0,
        highestFill: dams.length > 0 ? Math.max(...dams.map(d => d.fillPercentage)) : 0,
        lowestFill: dams.length > 0 ? Math.min(...dams.map(d => d.fillPercentage)) : 0,
      };
      
      res.json({
        success: true,
        stats,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DamController();
