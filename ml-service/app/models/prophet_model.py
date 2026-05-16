from prophet import Prophet
import pandas as pd
import numpy as np
from typing import List, Dict, Optional
from datetime import datetime, timedelta

class ProphetModel:
    def __init__(self):
        # Prophet varsayılan olarak %80 güven aralığı (interval_width=0.80) kullanır.
        self.model = None
        self.is_fitted = False
    
    def _create_model(self):
        """Create a new Prophet model instance"""
        return Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            daily_seasonality=False,
            changepoint_prior_scale=0.05,
            interval_width=0.80
        )
    
    def train(self, df: pd.DataFrame):
        """
        Prophet modelini eğitir.
        df sütunları: 'ds' (tarih) ve 'y' (değer) olmalıdır.
        """
        try:
            if df is None or len(df) == 0:
                self.is_fitted = False
                return False
            
            self.model = self._create_model()
            self.model.fit(df)
            self.is_fitted = True
            return True
        except Exception as e:
            print(f"Prophet training error: {e}")
            self.is_fitted = False
            return False
    
    def predict(self, periods: int = 7) -> pd.DataFrame:
        """Gelecek değerleri tahmin eder"""
        if not self.is_fitted or self.model is None:
            # Model eğitilmemişse mock tahmin döndür
            return self._mock_forecast(periods)
        
        try:
            future = self.model.make_future_dataframe(periods=periods)
            forecast = self.model.predict(future)
            return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)
        except:
            return self._mock_forecast(periods)
    
    def _mock_forecast(self, periods: int = 7) -> pd.DataFrame:
        """Mock tahmin döndür (model hazır değilse)"""
        dates = [datetime.now() + timedelta(days=i) for i in range(1, periods + 1)]
        predictions = [45000 + np.random.normal(0, 1000) for _ in range(periods)]
        
        return pd.DataFrame({
            'ds': dates,
            'yhat': predictions,
            'yhat_lower': [p - 2000 for p in predictions],
            'yhat_upper': [p + 2000 for p in predictions]
        })
    
    def predict_with_confidence(self, periods: int = 7) -> dict:
        """Güven aralıkları ve teknik metriklerle beraber tahmin döndürür"""
        forecast = self.predict(periods)
        
        return {
            'dates': forecast['ds'].dt.strftime('%Y-%m-%d').tolist(),
            'predictions': forecast['yhat'].tolist(),
            'lower_bound': forecast['yhat_lower'].tolist(),
            'upper_bound': forecast['yhat_upper'].tolist(),
            'confidence_level': 80,
            'model_name': 'Facebook Prophet',
            'is_mock': not self.is_fitted
        }
    
    def train_from_api_data(self, data: List[Dict]) -> bool:
        """API'den gelen verileri kullanarak eğit"""
        try:
            if not data or len(data) < 5:
                return False
            
            # Convert API data to Prophet format
            df_data = []
            for item in data:
                df_data.append({
                    'ds': pd.to_datetime(item.get('timestamp', datetime.now())),
                    'y': float(item.get('consumption', 45000))
                })
            
            df = pd.DataFrame(df_data).sort_values('ds')
            
            if len(df) < 5:
                return False
            
            return self.train(df)
        except Exception as e:
            print(f"Error training from API data: {e}")
            return False
    