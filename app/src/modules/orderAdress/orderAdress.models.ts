import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";

export interface OrderAddressAttributes {
  id_address: number;
  country: string;
  department: string;
  city: string;
  postal_code: number;
  street: string;
  number: number;
  is_active: boolean;
}

export interface OrderAddressCreationAttributes extends Optional<OrderAddressAttributes, "id_address"> {}

class OrderAddress extends Model<OrderAddressAttributes, OrderAddressCreationAttributes> implements OrderAddressAttributes {
  public id_address!: number;
  public country!: string;
  public department!: string;
  public city!: string;
  public postal_code!: number;
  public street!: string;
  public number!: number;
  public is_active!: boolean;
}

OrderAddress.init(
  {
    id_address: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderAddress",
    tableName: "order_address",
    timestamps: false,
  }
);

export default OrderAddress;
