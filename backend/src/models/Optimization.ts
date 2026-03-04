import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface OptimizationAttributes {
  id: number;
  scenarioName: string;
  scenarioType: 'low_rainfall' | 'high_demand' | 'low_solar' | 'peak_hours' | 'drought' | 'custom';
  targetDate: Date;
  energyDemand: number;
  waterDemand: number;
  solarCapacity: number;
  damLevel: number;
  optimizedEnergyAllocation: number;
  optimizedWaterAllocation: number;
  efficiency: number;
  cost: number;
  parameters: object;
  recommendations: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt?: Date;
  updatedAt?: Date;
}

interface OptimizationCreationAttributes extends Optional<OptimizationAttributes, 'id'> {}

class Optimization extends Model<OptimizationAttributes, OptimizationCreationAttributes> implements OptimizationAttributes {
  public id!: number;
  public scenarioName!: string;
  public scenarioType!: 'low_rainfall' | 'high_demand' | 'low_solar' | 'peak_hours' | 'drought' | 'custom';
  public targetDate!: Date;
  public energyDemand!: number;
  public waterDemand!: number;
  public solarCapacity!: number;
  public damLevel!: number;
  public optimizedEnergyAllocation!: number;
  public optimizedWaterAllocation!: number;
  public efficiency!: number;
  public cost!: number;
  public parameters!: object;
  public recommendations!: string;
  public status!: 'pending' | 'completed' | 'failed';
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Optimization.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    scenarioName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scenarioType: {
      type: DataTypes.ENUM('low_rainfall', 'high_demand', 'low_solar', 'peak_hours', 'drought', 'custom'),
      allowNull: false,
    },
    targetDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    energyDemand: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'MWh',
    },
    waterDemand: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'm³',
    },
    solarCapacity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'MW',
    },
    damLevel: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Percentage',
    },
    optimizedEnergyAllocation: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'MWh',
    },
    optimizedWaterAllocation: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'm³',
    },
    efficiency: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Percentage',
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'TRY',
    },
    parameters: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    recommendations: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'optimization_scenarios',
    timestamps: false,
    indexes: [
      {
        fields: ['scenarioType'],
      },
      {
        fields: ['targetDate'],
      },
      {
        fields: ['status'],
      },
    ],
  }
);

export { Optimization, OptimizationAttributes };
