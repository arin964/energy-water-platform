export interface WaterData {
  id: number;
  timestamp: Date;
  consumption: number;
  sector: 'domestic' | 'industrial' | 'agricultural' | 'other';
  region: string;
  population: number;
  rainfall: number;
  temperature: number;
}

export interface WaterStats {
  totalConsumption: number;
  avgConsumption: number;
  maxConsumption: number;
  minConsumption: number;
  avgRainfall: number;
}

export interface SectorData {
  sector: string;
  totalConsumption: number;
  avgConsumption: number;
  count: number;
}
