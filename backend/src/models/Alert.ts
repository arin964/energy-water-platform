import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface AlertAttributes {
  id: number;
  type: 'warning' | 'critical' | 'info';
  category: 'energy' | 'water' | 'dam' | 'optimization';
  title: string;
  message: string;
  severity: number;
  isActive: boolean;
  resolvedAt?: Date;
  metadata: object;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AlertCreationAttributes extends Optional<AlertAttributes, 'id'> {}

class Alert extends Model<AlertAttributes, AlertCreationAttributes> implements AlertAttributes {
  public id!: number;
  public type!: 'warning' | 'critical' | 'info';
  public category!: 'energy' | 'water' | 'dam' | 'optimization';
  public title!: string;
  public message!: string;
  public severity!: number;
  public isActive!: boolean;
  public resolvedAt?: Date;
  public metadata!: object;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Alert.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('warning', 'critical', 'info'),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('energy', 'water', 'dam', 'optimization'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    severity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Severity level 1-10',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    resolvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    sequelize,
    tableName: 'alerts',
    timestamps: false,
    indexes: [
      {
        fields: ['type'],
      },
      {
        fields: ['category'],
      },
      {
        fields: ['isActive'],
      },
    ],
  }
);

export { Alert, AlertAttributes };
