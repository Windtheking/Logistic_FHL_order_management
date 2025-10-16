import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";

export interface WarehouseAttributes {
  id_warehouse: number;
  warehouse_name: string;
}

export interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, "id_warehouse"> {}

class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes> implements WarehouseAttributes {
  public id_warehouse!: number;
  public warehouse_name!: string;
}

Warehouse.init(
  {
    id_warehouse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    warehouse_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Warehouse",
    tableName: "warehouses",
    timestamps: false,
  }
);

export default Warehouse;
