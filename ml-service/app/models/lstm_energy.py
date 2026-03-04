import numpy as np
import pandas as pd
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.preprocessing import MinMaxScaler
from typing import List, Tuple
import os

class EnergyLSTM:
    def __init__(self, units: int = 64, lookback: int = 7):
        self.units = units
        self.lookback = lookback
        self.model = None
        self.scaler = MinMaxScaler()
        
    def build_model(self, input_shape: Tuple[int, int]):
        """Build LSTM model architecture"""
        model = keras.Sequential([
            layers.LSTM(self.units, return_sequences=True, input_shape=input_shape),
            layers.Dropout(0.2),
            layers.LSTM(self.units // 2, return_sequences=False),
            layers.Dropout(0.2),
            layers.Dense(32, activation='relu'),
            layers.Dense(1)
        ])
        
        model.compile(
            optimizer='adam',
            loss='mse',
            metrics=['mae']
        )
        
        self.model = model
        return model
    
    def prepare_data(self, data: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """Prepare time series data for LSTM"""
        scaled_data = self.scaler.fit_transform(data.reshape(-1, 1))
        
        X, y = [], []
        for i in range(len(scaled_data) - self.lookback):
            X.append(scaled_data[i:i + self.lookback])
            y.append(scaled_data[i + self.lookback])
        
        return np.array(X), np.array(y)
    
    def train(self, data: np.ndarray, epochs: int = 50, batch_size: int = 32):
        """Train the LSTM model"""
        X, y = self.prepare_data(data)
        
        if self.model is None:
            self.build_model(input_shape=(X.shape[1], X.shape[2]))
        
        history = self.model.fit(
            X, y,
            epochs=epochs,
            batch_size=batch_size,
            validation_split=0.2,
            verbose=1
        )
        
        return history
    
    def predict(self, data: np.ndarray, steps: int = 7) -> List[float]:
        """Predict future values"""
        if self.model is None:
            raise ValueError("Model not trained yet!")
        
        scaled_data = self.scaler.transform(data.reshape(-1, 1))
        predictions = []
        
        current_sequence = scaled_data[-self.lookback:].reshape(1, self.lookback, 1)
        
        for _ in range(steps):
            pred = self.model.predict(current_sequence, verbose=0)
            predictions.append(pred[0, 0])
            
            # Update sequence
            current_sequence = np.roll(current_sequence, -1, axis=1)
            current_sequence[0, -1, 0] = pred[0, 0]
        
        # Inverse transform predictions
        predictions = self.scaler.inverse_transform(
            np.array(predictions).reshape(-1, 1)
        ).flatten()
        
        return predictions.tolist()
    
    def save(self, path: str):
        """Save model to disk"""
        if self.model:
            self.model.save(path)
    
    def load(self, path: str):
        """Load model from disk"""
        if os.path.exists(path):
            self.model = keras.models.load_model(path)
