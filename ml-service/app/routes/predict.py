from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from datetime import datetime, timedelta

router = APIRouter()

class PredictRequest(BaseModel):
    days: int = 7

class PredictResponse(BaseModel):
    predictions: List[float]
    dates: List[str]
    confidence: float
    model_used: str

@router.post("/energy", response_model=PredictResponse)
async def predict_energy(request: PredictRequest):
    """
    Predict energy production for next N days
    """
    try:
        # Mock prediction (will be replaced with actual model)
        days = request.days
        base_value = 50
        
        predictions = [
            base_value + np.random.normal(0, 5) + i * 0.5
            for i in range(days)
        ]
        
        dates = [
            (datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d')
            for i in range(days)
        ]
        
        return PredictResponse(
            predictions=predictions,
            dates=dates,
            confidence=0.85,
            model_used="LSTM"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/water", response_model=PredictResponse)
async def predict_water(request: PredictRequest):
    """
    Predict water consumption for next N days
    """
    try:
        days = request.days
        base_value = 45000
        
        predictions = [
            base_value + np.random.normal(0, 2000) + i * 100
            for i in range(days)
        ]
        
        dates = [
            (datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d')
            for i in range(days)
        ]
        
        return PredictResponse(
            predictions=predictions,
            dates=dates,
            confidence=0.82,
            model_used="Prophet"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/dam", response_model=PredictResponse)
async def predict_dam_level(request: PredictRequest):
    """
    Predict dam water level for next N days
    """
    try:
        days = request.days
        base_value = 75
        
        predictions = [
            max(0, min(100, base_value + np.random.normal(0, 3) - i * 0.2))
            for i in range(days)
        ]
        
        dates = [
            (datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d')
            for i in range(days)
        ]
        
        return PredictResponse(
            predictions=predictions,
            dates=dates,
            confidence=0.78,
            model_used="LSTM"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
