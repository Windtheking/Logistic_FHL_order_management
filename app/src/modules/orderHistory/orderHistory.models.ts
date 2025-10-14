/**
 * PRIORITY MODEL
 * ==============
 * Defines task priorities (Low, Medium, High, Urgent)
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface orderHistoryAttributes {
    client_id: number;
    order_id: number;
}

export interface orderHistoryCreationAttributes 
    extends Optional<orderHistoryAttributes, "client_id"> {}

class orderHistory extends Model<orderHistoryAttributes, orderHistoryCreationAttributes> 
    implements orderHistoryAttributes {
    public client_id!: number;
    public order_id!: number;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

orderHistory.init(
    {
        priority_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        priority: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "PriorityOrdenace",
        tableName: "priority_ordenace",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default orderHistory;