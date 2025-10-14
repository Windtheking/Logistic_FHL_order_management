import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";

export interface OrderAttributes {
  id_order: number;
  order_state_id: number;
  order_address_id: number;
  client_id: number;
  warehouse_id: number;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, "id_order"> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id_order!: number;
  public order_state_id!: number;
  public order_address_id!: number;
  public client_id!: number;
  public warehouse_id!: number;
}

Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "order",
    timestamps: false,
  }
);

export default Order;
