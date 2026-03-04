export interface ForecastData {
  id: number;
  type: 'energy' | 'water' | 'dam';
  targetDate: Date;
  predictedValue: number;
  confidence: number;
  modelUsed: string;
}

export interface Alert {
  id: number;
  type: 'warning' | 'critical' | 'info';
  category: 'energy' | 'water' | 'dam' | 'optimization';
  title: string;
  message: string;
  severity: number;
  isActive: boolean;
  createdAt: Date;
}
