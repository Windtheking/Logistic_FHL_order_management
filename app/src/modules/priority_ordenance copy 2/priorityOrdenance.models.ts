/**
 * PRIORITY MODEL
 * ==============
 * Defines task priorities (Low, Medium, High, Urgent)
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface PriorityOrdenaceAttributes {
    priority_id: number;
    priority: string;
}

export interface PriorityOrdenaceCreationAttributes 
    extends Optional<PriorityOrdenaceAttributes, "priority_id"> {}

class PriorityOrdenace extends Model<PriorityOrdenaceAttributes, PriorityOrdenaceCreationAttributes> 
    implements PriorityOrdenaceAttributes {
    public priority_id!: number;
    public priority!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

PriorityOrdenace.init(
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

export default PriorityOrdenace;