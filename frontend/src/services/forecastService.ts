import api from './api';
import { ForecastData } from '../types/forecast';

export const forecastService = {
  getEnergyForecast: async (days: number = 7) => {
    const response = await api.get('/forecast/energy', { params: { days } });
    return response.data.data;
  },

  getWaterForecast: async (days: number = 7) => {
    const response = await api.get('/forecast/water', { params: { days } });
    return response.data.data;
  },

  getDamForecast: async (days: number = 7, damId?: string) => {
    const response = await api.get('/forecast/dam', { params: { days, damId } });
    return response.data.data;
  },

  getAllForecasts: async (type?: 'energy' | 'water' | 'dam') => {
    const response = await api.get<{ data: ForecastData[] }>('/forecast/all', { params: { type } });
    return response.data.data;
  },
};
