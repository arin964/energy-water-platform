import api from './api';
import { EnergyData, EnergyStats } from '../types/energy';

export const energyService = {
  getAll: async (params?: { startDate?: string; endDate?: string; location?: string }) => {
    const response = await api.get<{ data: EnergyData[] }>('/energy', { params });
    return response.data.data;
  },

  getLatest: async () => {
    const response = await api.get<{ data: EnergyData }>('/energy/latest');
    return response.data.data;
  },

  getStats: async (params?: { startDate?: string; endDate?: string }) => {
    const response = await api.get<{ stats: EnergyStats }>('/energy/stats', { params });
    return response.data.stats;
  },
};
