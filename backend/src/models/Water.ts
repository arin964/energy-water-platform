import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface WaterAttributes {
  id: number;
  timestamp: Date;
  consumption: number;
  sector: 'domestic' | 'industrial' | 'agricultural' | 'other';
  region: string;
  population: number;
  rainfall: number;
  temperature: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WaterCreationAttributes extends Optional<WaterAttributes, 'id'> {}

class Water extends Model<WaterAttributes, WaterCreationAttributes> implements WaterAttributes {
  public id!: number;
  public timestamp!: Date;
  public consumption!: number;
  public sector!: 'domestic' | 'industrial' | 'agricultural' | 'other';
  public region!: string;
  public population!: number;
  public rainfall!: number;
  public temperature!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Water.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    consumption: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'm³',
    },
    sector: {
      type: DataTypes.ENUM('domestic', 'industrial', 'agricultural', 'other'),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rainfall: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'mm',
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Celsius',
    },
  },
  {
    sequelize,
    tableName: 'water_data',
    timestamps: false,
    indexes: [
      {
        fields: ['timestamp'],
      },
      {
        fields: ['sector'],
      },
      {
        fields: ['region'],
      },
    ],
  }
);

export { Water, WaterAttributes };
