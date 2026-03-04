import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface EnergyAttributes {
  id: number;
  timestamp: Date;
  solarRadiation?: number;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  energyProduced?: number;
  location: string;
  latitude: number;
  longitude: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EnergyCreationAttributes extends Optional<EnergyAttributes, 'id'> {}

class Energy extends Model<EnergyAttributes, EnergyCreationAttributes> implements EnergyAttributes {
  public id!: number;
  public timestamp!: Date;
  public solarRadiation?: number;
  public temperature?: number;
  public humidity?: number;
  public windSpeed?: number;
  public energyProduced?: number;
  public location!: string;
  public latitude!: number;
  public longitude!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Energy.init(
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
    solarRadiation: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'W/m²',
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Celsius',
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Percentage',
    },
    windSpeed: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'm/s',
    },
    energyProduced: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'MWh',
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'energy_data',
    timestamps: false,
    indexes: [
      {
        fields: ['timestamp'],
      },
      {
        fields: ['location'],
      },
    ],
  }
);

export { Energy, EnergyAttributes };
