import api from './api';
import { WaterData, WaterStats, SectorData } from '../types/water';

export interface Dam {
  id: number;
  name: string;
  location: string;
  capacity: number;
  currentLevel: number;
  fillPercentage: number;
  inflow: number;
  outflow: number;
  timestamp: Date;
  latitude: number;
  longitude: number;
}

export interface DamStats {
  totalDams: number;
  totalCapacity: number;
  totalCurrentLevel: number;
  avgFillPercentage: number;
  highestFill: number;
  lowestFill: number;
}

export const waterService = {
  getAll: async (params?: { startDate?: string; endDate?: string; sector?: string; region?: string }) => {
    const response = await api.get<{ data: WaterData[] }>('/water', { params });
    return response.data.data;
  },

  getBySector: async (params?: { startDate?: string; endDate?: string }) => {
    const response = await api.get<{ data: SectorData[] }>('/water/by-sector', { params });
    return response.data.data;
  },

  getStats: async (params?: { startDate?: string; endDate?: string }) => {
    const response = await api.get<{ stats: WaterStats }>('/water/stats', { params });
    return response.data.stats;
  },
};

export const damService = {
  getAll: async () => {
    const response = await api.get<{ data: Dam[] }>('/dams');
    return response.data.data;
  },

  getById: async (id: number) => {
    const response = await api.get<{ data: Dam }>(`/dams/${id}`);
    return response.data.data;
  },

  create: async (data: Omit<Dam, 'id'>) => {
    const response = await api.post<{ data: Dam }>('/dams', data);
    return response.data.data;
  },

  update: async (id: number, data: Partial<Dam>) => {
    const response = await api.put<{ data: Dam }>(`/dams/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number) => {
    await api.delete(`/dams/${id}`);
  },

  getStats: async () => {
    const response = await api.get<{ stats: DamStats }>('/dams/stats/overview');
    return response.data.stats;
  },
};
