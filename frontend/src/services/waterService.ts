import api from './api';
import { WaterData, WaterStats, SectorData } from '../types/water';

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
