import { Alert } from '../models/Alert';
import { Energy } from '../models/Energy';
import { Water } from '../models/Water';
import { Dam } from '../models/Dam';
import axios from 'axios';
import { config } from '../config/env';

export class AlertService {
  /**
   * Gerçek tetikleme koşullarına göre bildirim oluştur
   * 
   * TEKİ KURALLAR:
   * 1. ENERGY: Üretim <30 MWh (çok düşük)
   * 2. ENERGY: Tahmin 7 günde düşüş >20% 
   * 3. WATER: Tüketim >50000 m³ (çok yüksek)
   * 4. WATER: Tahmin 7 günde artış >15%
   * 5. DAM: Doluluk <%50 (tehlikeli düşük)
   * 6. DAM: Tahmin 7 günde <40% (kritik)
   * 7. OPTIMIZATION: Optimize çözüm bulunamıyor
   */
  
  async checkEnergyAlerts() {
    try {
      // Son günün enerji üretimini kontrol et
      const lastEnergy = await Energy.findOne({
        order: [['timestamp', 'DESC']],
      });

      if (!lastEnergy || !lastEnergy.energyProduced) return;

      // Kural 1: Üretim <30 MWh
      if (lastEnergy.energyProduced < 30) {
        await this.createOrUpdateAlert(
          'critical',
          'energy',
          'Düşük Enerji Üretimi',
          `Enerji üretimi kritik düşük: ${lastEnergy.energyProduced} MWh (Eşik: 30 MWh)`,
          9,
          { actualValue: lastEnergy.energyProduced, threshold: 30, unit: 'MWh' }
        );
      } else {
        // Uyarıyı kapat
        await this.resolveAlert('energy', 'Düşük Enerji Üretimi');
      }

      // Kural 2: Tahmin kontrolü - ML servisinden tahmin al
      try {
        const forecastResponse = await axios.post(
          `${config.mlService.url}/predict/energy`,
          { days: 7 }
        );

        const predictions = forecastResponse.data.predictions;
        if (predictions && predictions.length > 0) {
          const currentValue = lastEnergy.energyProduced;
          const avgForecast = predictions.reduce((a: number, b: number) => a + b, 0) / predictions.length;
          const changePercent = ((avgForecast - currentValue) / (currentValue || 1)) * 100;

          if (changePercent < -20) {
            await this.createOrUpdateAlert(
              'warning',
              'energy',
              'Enerji Üretiminde Düşüş Bekleniyor',
              `Önümüzdeki 7 günde enerji üretiminde %${Math.abs(changePercent).toFixed(1)} düşüş tahmin ediliyor`,
              7,
              { changePercent, currentValue, forecast: avgForecast }
            );
          } else {
            await this.resolveAlert('energy', 'Enerji Üretiminde Düşüş Bekleniyor');
          }
        }
      } catch (e) {
        console.log('Forecast error for energy:', e);
      }
    } catch (error) {
      console.error('Energy alert check error:', error);
    }
  }

  async checkWaterAlerts() {
    try {
      // Son günün su tüketimini kontrol et
      const lastWater = await Water.findOne({
        order: [['timestamp', 'DESC']],
      });

      if (!lastWater || !lastWater.consumption) return;

      // Kural 3: Tüketim >50000 m³
      if (lastWater.consumption > 50000) {
        await this.createOrUpdateAlert(
          'critical',
          'water',
          'Yüksek Su Tüketimi',
          `Su tüketimi kritik yüksek: ${lastWater.consumption.toFixed(0)} m³ (Eşik: 50000 m³)`,
          9,
          { actualValue: lastWater.consumption, threshold: 50000, unit: 'm³' }
        );
      } else if (lastWater.consumption > 48000) {
        await this.createOrUpdateAlert(
          'warning',
          'water',
          'Yüksek Su Tüketimi',
          `Su tüketimi yüksek: ${lastWater.consumption.toFixed(0)} m³`,
          6,
          { actualValue: lastWater.consumption }
        );
      } else {
        await this.resolveAlert('water', 'Yüksek Su Tüketimi');
      }

      // Kural 4: Tahmin kontrolü
      try {
        const forecastResponse = await axios.post(
          `${config.mlService.url}/predict/water`,
          { days: 7 }
        );

        const predictions = forecastResponse.data.predictions;
        if (predictions && predictions.length > 0) {
          const currentValue = lastWater.consumption;
          const avgForecast = predictions.reduce((a: number, b: number) => a + b, 0) / predictions.length;
          const changePercent = ((avgForecast - currentValue) / (currentValue || 1)) * 100;

          if (changePercent > 15) {
            await this.createOrUpdateAlert(
              'warning',
              'water',
              'Su Tüketiminde Artış Bekleniyor',
              `Önümüzdeki 7 günde su tüketiminde %${changePercent.toFixed(1)} artış tahmin ediliyor`,
              7,
              { changePercent, currentValue, forecast: avgForecast }
            );
          } else {
            await this.resolveAlert('water', 'Su Tüketiminde Artış Bekleniyor');
          }
        }
      } catch (e) {
        console.log('Forecast error for water:', e);
      }
    } catch (error) {
      console.error('Water alert check error:', error);
    }
  }

  async checkDamAlerts() {
    try {
      // Son günün baraj seviyesini kontrol et
      const lastDam = await Dam.findOne({
        order: [['timestamp', 'DESC']],
      });

      if (!lastDam || !lastDam.currentLevel || !lastDam.capacity) return;

      const fillPercentage = (lastDam.currentLevel / lastDam.capacity) * 100;

      // Kural 5: Doluluk <%50
      if (fillPercentage < 50) {
        const severity = fillPercentage < 35 ? 10 : 8;
        const type = fillPercentage < 35 ? 'critical' : 'warning';

        await this.createOrUpdateAlert(
          type,
          'dam',
          `${lastDam.name} Doluluk Uyarısı`,
          `${lastDam.name} doluluk seviyesi: %${fillPercentage.toFixed(1)} (Eşik: %50)`,
          severity,
          { damName: lastDam.name, fillPercentage, capacity: lastDam.capacity }
        );
      } else {
        await this.resolveAlert('dam', `${lastDam.name} Doluluk Uyarısı`);
      }

      // Kural 6: Tahmin kontrolü
      try {
        const forecastResponse = await axios.post(
          `${config.mlService.url}/predict/dam`,
          { days: 7 }
        );

        const predictions = forecastResponse.data.predictions;
        if (predictions && predictions.length > 0) {
          const minForecast = Math.min(...predictions);

          if (minForecast < 40) {
            await this.createOrUpdateAlert(
              'critical',
              'dam',
              `${lastDam.name} Kritik Doluluk Uyarısı`,
              `${lastDam.name} tahmini minimum doluluk: %${minForecast.toFixed(1)}`,
              10,
              { damName: lastDam.name, forecastMin: minForecast }
            );
          }
        }
      } catch (e) {
        console.log('Forecast error for dam:', e);
      }
    } catch (error) {
      console.error('Dam alert check error:', error);
    }
  }

  /**
   * Uyarı oluştur veya güncelle (aynı uyarı tekrar tetiklenmeysin)
   */
  private async createOrUpdateAlert(
    type: 'warning' | 'critical' | 'info',
    category: 'energy' | 'water' | 'dam' | 'optimization',
    title: string,
    message: string,
    severity: number,
    metadata: any = {}
  ) {
    try {
      // Aynı başlığa sahip aktif uyarıyı kontrol et
      const existingAlert = await Alert.findOne({
        where: {
          title,
          category,
          isActive: true,
        },
      });

      if (existingAlert) {
        // Varsa güncelle (timestamp'i refreshle)
        await existingAlert.update({ message, severity, metadata });
      } else {
        // Yoksa yarat
        await Alert.create({
          type,
          category,
          title,
          message,
          severity,
          isActive: true,
          metadata,
        });
      }
    } catch (error) {
      console.error('Alert creation error:', error);
    }
  }

  /**
   * Uyarıyı kapat
   */
  private async resolveAlert(category: string, title: string) {
    try {
      const alert = await Alert.findOne({
        where: {
          title,
          category,
          isActive: true,
        },
      });

      if (alert) {
        await alert.update({
          isActive: false,
          resolvedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Alert resolution error:', error);
    }
  }

  /**
   * Tüm alertleri kontrol et (periyodik olarak çalıştırılacak)
   */
  async checkAllAlerts() {
    console.log('[AlertService] Checking all alerts...');
    await this.checkEnergyAlerts();
    await this.checkWaterAlerts();
    await this.checkDamAlerts();
    console.log('[AlertService] Alert check completed');
  }
}

export default new AlertService();
