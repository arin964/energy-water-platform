import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ModelMetricsAttributes {
  id: number;
  modelType: 'LSTM' | 'Prophet' | 'XGBoost';
  targetVariable: 'energy' | 'water' | 'dam';
  rmse: number;
  mae: number;
  mape: number;
  r2Score: number;
  trainingSamples: number;
  testingSamples: number;
  trainingDate: Date;
  version: string;
  parameters: object;
  status: 'active' | 'deprecated' | 'testing';
  createdAt?: Date;
  updatedAt?: Date;
}

interface ModelMetricsCreationAttributes extends Optional<ModelMetricsAttributes, 'id'> {}

class ModelMetrics extends Model<ModelMetricsAttributes, ModelMetricsCreationAttributes> implements ModelMetricsAttributes {
  public id!: number;
  public modelType!: 'LSTM' | 'Prophet' | 'XGBoost';
  public targetVariable!: 'energy' | 'water' | 'dam';
  public rmse!: number;
  public mae!: number;
  public mape!: number;
  public r2Score!: number;
  public trainingSamples!: number;
  public testingSamples!: number;
  public trainingDate!: Date;
  public version!: string;
  public parameters!: object;
  public status!: 'active' | 'deprecated' | 'testing';
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ModelMetrics.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    modelType: {
      type: DataTypes.ENUM('LSTM', 'Prophet', 'XGBoost'),
      allowNull: false,
    },
    targetVariable: {
      type: DataTypes.ENUM('energy', 'water', 'dam'),
      allowNull: false,
    },
    rmse: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Root Mean Square Error',
    },
    mae: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Mean Absolute Error',
    },
    mape: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Mean Absolute Percentage Error',
    },
    r2Score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'R-squared Score',
    },
    trainingSamples: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    testingSamples: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trainingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parameters: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    status: {
      type: DataTypes.ENUM('active', 'deprecated', 'testing'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    tableName: 'model_metrics',
    timestamps: false,
    indexes: [
      {
        fields: ['modelType', 'targetVariable'],
      },
      {
        fields: ['status'],
      },
    ],
  }
);

export { ModelMetrics, ModelMetricsAttributes };
