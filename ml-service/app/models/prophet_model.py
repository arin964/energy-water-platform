from prophet import Prophet
import pandas as pd
import numpy as np
from typing import List

class ProphetModel:
    def __init__(self):
        # Prophet varsayılan olarak %80 güven aralığı (interval_width=0.80) kullanır.
        self.model = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            daily_seasonality=False,
            changepoint_prior_scale=0.05
        )
        self.is_fitted = False
    
    def train(self, df: pd.DataFrame):
        """
        Prophet modelini eğitir.
        df sütunları: 'ds' (tarih) ve 'y' (değer) olmalıdır.
        """
        self.model.fit(df)
        self.is_fitted = True
    
    def predict(self, periods: int = 7) -> pd.DataFrame:
        """Gelecek değerleri tahmin eder"""
        if not self.is_fitted:
            raise ValueError("Model henüz eğitilmedi!")
        
        future = self.model.make_future_dataframe(periods=periods)
        forecast = self.model.predict(future)
        
        return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)
    
    def predict_with_confidence(self, periods: int = 7) -> dict:
        """Güven aralıkları ve teknik metriklerle beraber tahmin döndürür"""
        forecast = self.predict(periods)
        
        return {
            'dates': forecast['ds'].dt.strftime('%Y-%m-%d').tolist(),
            'predictions': forecast['yhat'].tolist(),
            'lower_bound': forecast['yhat_lower'].tolist(),
            'upper_bound': forecast['yhat_upper'].tolist(),
            'confidence_level': 80, # Jüride 'İstatistiksel güven düzeyi' olarak bahsedebilirsin
            'model_name': 'Facebook Prophet'
        }
    