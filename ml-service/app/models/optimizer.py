import numpy as np
from scipy.optimize import linprog
from typing import Dict, List, Tuple

class EnergyWaterOptimizer:
    def __init__(self):
        pass
    
    def optimize_water_treatment_time(
        self,
        energy_forecast: List[float],
        water_demand: List[float],
        energy_cost: List[float]
    ) -> Dict:
        """
        Find optimal time for water treatment based on energy availability and cost
        """
        # Simple optimization: find time with highest energy and lowest cost
        scores = []
        
        for i in range(len(energy_forecast)):
            # Normalize values
            energy_score = energy_forecast[i] / max(energy_forecast) if max(energy_forecast) > 0 else 0
            cost_score = 1 - (energy_cost[i] / max(energy_cost)) if max(energy_cost) > 0 else 0
            demand_score = water_demand[i] / max(water_demand) if max(water_demand) > 0 else 0
            
            # Combined score (weighted average)
            total_score = (energy_score * 0.4) + (cost_score * 0.3) + (demand_score * 0.3)
            scores.append(total_score)
        
        best_time_index = int(np.argmax(scores))
        
        return {
            'best_time_index': best_time_index,
            'score': float(scores[best_time_index]),
            'energy_available': float(energy_forecast[best_time_index]),
            'estimated_cost': float(energy_cost[best_time_index]),
            'recommendation': f"En uygun zaman: {best_time_index}. saat"
        }
    
    def optimize_resource_allocation(
        self,
        energy_available: float,
        water_demand: float,
        constraints: Dict
    ) -> Dict:
        """
        Optimize resource allocation using linear programming
        """
        # Objective: Maximize efficiency
        # Decision variables: [water_treatment, irrigation, industrial_use]
        
        c = [-1, -0.8, -0.6]  # Coefficients (negative for maximization)
        
        # Constraints
        A_ub = [
            [1, 0.5, 0.3],  # Energy constraint
            [0.8, 1, 0.5],  # Water constraint
        ]
        
        b_ub = [
            energy_available,
            water_demand,
        ]
        
        # Bounds
        bounds = [(0, None), (0, None), (0, None)]
        
        result = linprog(c, A_ub=A_ub, b_ub=b_ub, bounds=bounds, method='highs')
        
        if result.success:
            return {
                'success': True,
                'water_treatment': float(result.x[0]),
                'irrigation': float(result.x[1]),
                'industrial_use': float(result.x[2]),
                'total_efficiency': float(-result.fun),
                'message': 'Optimizasyon başarılı'
            }
        else:
            return {
                'success': False,
                'message': 'Optimizasyon başarısız'
            }
    
    def scenario_analysis(
        self,
        base_energy: float,
        base_water: float,
        scenario_params: Dict
    ) -> Dict:
        """
        Run what-if scenario analysis
        """
        # Apply scenario changes
        energy_multiplier = scenario_params.get('energy_change', 1.0)
        water_multiplier = scenario_params.get('water_change', 1.0)
        rainfall_change = scenario_params.get('rainfall_change', 0)
        
        new_energy = base_energy * energy_multiplier
        new_water = base_water * water_multiplier
        
        # Calculate impacts
        energy_deficit = max(0, base_energy - new_energy)
        water_deficit = max(0, base_water - new_water)
        
        # Risk assessment
        risk_level = 'low'
        if energy_deficit > base_energy * 0.2 or water_deficit > base_water * 0.2:
            risk_level = 'high'
        elif energy_deficit > base_energy * 0.1 or water_deficit > base_water * 0.1:
            risk_level = 'medium'
        
        return {
            'scenario': scenario_params,
            'projected_energy': float(new_energy),
            'projected_water': float(new_water),
            'energy_deficit': float(energy_deficit),
            'water_deficit': float(water_deficit),
            'risk_level': risk_level,
            'recommendations': self._generate_recommendations(risk_level, energy_deficit, water_deficit)
        }
    
    def _generate_recommendations(self, risk_level: str, energy_deficit: float, water_deficit: float) -> List[str]:
        """Generate recommendations based on analysis"""
        recommendations = []
        
        if risk_level == 'high':
            recommendations.append("Acil durum planlarını aktive edin")
            recommendations.append("Alternatif kaynak arayışına başlayın")
        
        if energy_deficit > 0:
            recommendations.append(f"Enerji tasarrufu hedefi: {energy_deficit:.2f} MWh")
        
        if water_deficit > 0:
            recommendations.append(f"Su tasarrufu hedefi: {water_deficit:.2f} m³")
        
        if not recommendations:
            recommendations.append("Mevcut durum stabil, özel önlem gerekmiyor")
        
        return recommendations
