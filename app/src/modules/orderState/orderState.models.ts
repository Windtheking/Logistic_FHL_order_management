import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";

export interface OrderStateAttributes {
  id_state: number;
  state: string;
  created_at?: Date;
}

export interface OrderStateCreationAttributes extends Optional<OrderStateAttributes, "id_state" | "created_at"> {}

class OrderState extends Model<OrderStateAttributes, OrderStateCreationAttributes> implements OrderStateAttributes {
  public id_state!: number;
  public state!: string;
  public created_at?: Date;
}

OrderState.init(
  {
    id_state: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "OrderState",
    tableName: "order_state",
    timestamps: false,
  }
);

export default OrderState;
