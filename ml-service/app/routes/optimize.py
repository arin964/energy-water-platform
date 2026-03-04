from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Optional
from app.models.optimizer import EnergyWaterOptimizer

router = APIRouter()
optimizer = EnergyWaterOptimizer()

class OptimizeRequest(BaseModel):
    days: int = 7

class ScenarioRequest(BaseModel):
    scenario: str
    parameters: Dict

class OptimizeResponse(BaseModel):
    recommendations: List[str]
    best_time: Optional[int] = None
    efficiency_score: float
    details: Dict

@router.post("", response_model=OptimizeResponse)
async def get_optimization(request: OptimizeRequest):
    """
    Get optimization recommendations for energy-water management
    """
    try:
        # Mock data
        energy_forecast = [50, 55, 48, 62, 58, 53, 60][:request.days]
        water_demand = [45000, 46000, 44500, 48000, 47000, 45500, 49000][:request.days]
        energy_cost = [0.15, 0.14, 0.16, 0.13, 0.14, 0.15, 0.12][:request.days]
        
        result = optimizer.optimize_water_treatment_time(
            energy_forecast,
            water_demand,
            energy_cost
        )
        
        recommendations = [
            result['recommendation'],
            f"Tahmini maliyet: {result['estimated_cost']:.2f} TL/kWh",
            f"Mevcut enerji: {result['energy_available']:.2f} MWh",
            "Su arıtma işlemini önerilen saatte yaparak %15 tasarruf sağlayabilirsiniz"
        ]
        
        return OptimizeResponse(
            recommendations=recommendations,
            best_time=result['best_time_index'],
            efficiency_score=result['score'],
            details=result
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/water-treatment")
async def optimize_water_treatment(request: OptimizeRequest):
    """
    Get best time for water treatment operations
    """
    try:
        energy_forecast = [50, 55, 48, 62, 58, 53, 60]
        water_demand = [45000, 46000, 44500, 48000, 47000, 45500, 49000]
        energy_cost = [0.15, 0.14, 0.16, 0.13, 0.14, 0.15, 0.12]
        
        result = optimizer.optimize_water_treatment_time(
            energy_forecast,
            water_demand,
            energy_cost
        )
        
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/scenario")
async def run_scenario(request: ScenarioRequest):
    """
    Run what-if scenario analysis
    """
    try:
        base_energy = 500.0  # MWh
        base_water = 450000.0  # m³
        
        result = optimizer.scenario_analysis(
            base_energy,
            base_water,
            request.parameters
        )
        
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
