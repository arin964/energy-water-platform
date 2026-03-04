import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface DamAttributes {
  id: number;
  name: string;
  location: string;
  capacity: number;
  currentLevel: number;
  fillPercentage: number;
  inflow: number;
  outflow: number;
  timestamp: Date;
  latitude: number;
  longitude: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DamCreationAttributes extends Optional<DamAttributes, 'id'> {}

class Dam extends Model<DamAttributes, DamCreationAttributes> implements DamAttributes {
  public id!: number;
  public name!: string;
  public location!: string;
  public capacity!: number;
  public currentLevel!: number;
  public fillPercentage!: number;
  public inflow!: number;
  public outflow!: number;
  public timestamp!: Date;
  public latitude!: number;
  public longitude!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Dam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Million m³',
    },
    currentLevel: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Million m³',
    },
    fillPercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Percentage',
    },
    inflow: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'm³/s',
    },
    outflow: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'm³/s',
    },
    timestamp: {
      type: DataTypes.DATE,
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
    tableName: 'dam_data',
    timestamps: false,
    indexes: [
      {
        fields: ['name'],
      },
      {
        fields: ['timestamp'],
      },
    ],
  }
);

export { Dam, DamAttributes };
