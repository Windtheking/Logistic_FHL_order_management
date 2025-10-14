/**
 * STATE MODEL
 * ===========
 * Defines task states (Pending, In Progress, Completed, Cancelled)
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";

export interface StateAttributes {
    state_id: number;
    state: string;
}

export interface StateCreationAttributes extends Optional<StateAttributes, "state_id"> {}

class State extends Model<StateAttributes, StateCreationAttributes> implements StateAttributes {
    public state_id!: number;
    public state!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

State.init(
    {
        state_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        state: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "State",
        tableName: "state",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default State;