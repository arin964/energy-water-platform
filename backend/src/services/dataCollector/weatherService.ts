import axios from 'axios';
import { config } from '../../config/env';

interface WeatherParams {
  latitude: number;
  longitude: number;
}

export class WeatherService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  private apiKey = config.apiKeys.openWeather;
  
  async getCurrentWeather(params: WeatherParams) {
    try {
      const { latitude, longitude } = params;
      
      if (!this.apiKey) {
        console.warn('OpenWeather API key not configured, using mock data');
        return this.getMockWeatherData();
      }
      
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey,
          units: 'metric',
        },
      });
      
      return {
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        windSpeed: response.data.wind.speed,
        description: response.data.weather[0].description,
        clouds: response.data.clouds.all,
      };
    } catch (error) {
      console.error('OpenWeather API Error:', error);
      return this.getMockWeatherData();
    }
  }
  
  async getForecast(params: WeatherParams) {
    try {
      const { latitude, longitude } = params;
      
      if (!this.apiKey) {
        return this.getMockForecastData();
      }
      
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey,
          units: 'metric',
        },
      });
      
      return response.data.list.map((item: any) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        description: item.weather[0].description,
      }));
    } catch (error) {
      console.error('OpenWeather Forecast Error:', error);
      return this.getMockForecastData();
    }
  }
  
  private getMockWeatherData() {
    return {
      temperature: 25 + Math.random() * 10,
      humidity: 50 + Math.random() * 30,
      pressure: 1013,
      windSpeed: 2 + Math.random() * 5,
      description: 'Clear sky',
      clouds: 10,
    };
  }
  
  private getMockForecastData() {
    return Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
      temperature: 20 + Math.random() * 15,
      humidity: 40 + Math.random() * 40,
      windSpeed: 1 + Math.random() * 6,
      description: 'Partly cloudy',
    }));
  }
}

export default new WeatherService();
