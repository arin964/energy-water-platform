import axios from 'axios';

interface NASADataParams {
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
}

export class NASAService {
  private baseUrl = 'https://power.larc.nasa.gov/api/temporal/daily/point';
  // private apiKey = config.apiKeys.nasa;
  
  async getSolarData(params: NASADataParams) {
    try {
      const { latitude, longitude, startDate, endDate } = params;
      
      const response = await axios.get(this.baseUrl, {
        params: {
          parameters: 'ALLSKY_SFC_SW_DWN,T2M,RH2M,WS10M',
          community: 'RE',
          longitude,
          latitude,
          start: startDate.replace(/-/g, ''),
          end: endDate.replace(/-/g, ''),
          format: 'JSON',
        },
      });
      
      return this.transformNASAData(response.data);
    } catch (error) {
      console.error('NASA API Error:', error);
      throw new Error('Failed to fetch NASA data');
    }
  }
  
  private transformNASAData(data: any) {
    const { properties } = data;
    const solarRadiation = properties.parameter.ALLSKY_SFC_SW_DWN;
    const temperature = properties.parameter.T2M;
    const humidity = properties.parameter.RH2M;
    const windSpeed = properties.parameter.WS10M;
    
    const transformed = Object.keys(solarRadiation).map((date) => ({
      date,
      solarRadiation: solarRadiation[date],
      temperature: temperature[date],
      humidity: humidity[date],
      windSpeed: windSpeed[date],
    }));
    
    return transformed;
  }
}

export default new NASAService();
