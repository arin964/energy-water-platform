export interface EnergyData {
  id: number;
  timestamp: Date;
  solarRadiation: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  energyProduced: number;
  location: string;
  latitude: number;
  longitude: number;
}

export interface EnergyStats {
  totalProduction: number;
  avgSolarRadiation: number;
  avgTemperature: number;
  maxProduction: number;
  minProduction: number;
}
