from prophet import Prophet
import pandas as pd
import numpy as np
from typing import List

class ProphetModel:
    def __init__(self):
        self.model = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            daily_seasonality=False,
            changepoint_prior_scale=0.05
        )
        self.is_fitted = False
    
    def train(self, df: pd.DataFrame):
        """
        Train Prophet model
        df should have columns: 'ds' (datetime) and 'y' (value)
        """
        self.model.fit(df)
        self.is_fitted = True
    
    def predict(self, periods: int = 7) -> pd.DataFrame:
        """Predict future values"""
        if not self.is_fitted:
            raise ValueError("Model not trained yet!")
        
        future = self.model.make_future_dataframe(periods=periods)
        forecast = self.model.predict(future)
        
        return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)
    
    def predict_with_confidence(self, periods: int = 7) -> dict:
        """Predict with confidence intervals"""
        forecast = self.predict(periods)
        
        return {
            'dates': forecast['ds'].dt.strftime('%Y-%m-%d').tolist(),
            'predictions': forecast['yhat'].tolist(),
            'lower_bound': forecast['yhat_lower'].tolist(),
            'upper_bound': forecast['yhat_upper'].tolist(),
        }
