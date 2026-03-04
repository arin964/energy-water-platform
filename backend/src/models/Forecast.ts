import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ForecastAttributes {
  id: number;
  type: 'energy' | 'water' | 'dam';
  targetDate: Date;
  predictedValue: number;
  confidence: number;
  modelUsed: string;
  parameters: object;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ForecastCreationAttributes extends Optional<ForecastAttributes, 'id'> {}

class Forecast extends Model<ForecastAttributes, ForecastCreationAttributes> implements ForecastAttributes {
  public id!: number;
  public type!: 'energy' | 'water' | 'dam';
  public targetDate!: Date;
  public predictedValue!: number;
  public confidence!: number;
  public modelUsed!: string;
  public parameters!: object;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Forecast.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('energy', 'water', 'dam'),
      allowNull: false,
    },
    targetDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    predictedValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    confidence: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Confidence score 0-1',
    },
    modelUsed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parameters: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    sequelize,
    tableName: 'forecasts',
    timestamps: false,
    indexes: [
      {
        fields: ['type'],
      },
      {
        fields: ['targetDate'],
      },
    ],
  }
);

export { Forecast, ForecastAttributes };
