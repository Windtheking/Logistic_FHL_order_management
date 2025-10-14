/**
 * STATE MODEL
 * ===========
 * Defines task states (Pending, In Progress, Completed, Cancelled)
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";

export interface ClientAttributes {
    client_id: number;
    client_name: string;
    client_email: string;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, "state_id"> {}

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
    public client_id!: number;
    public client_name!: string;
    public client_email!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Client.init(
    {
        client_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        client_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        client_email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "Client",
        tableName: "clients",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Client;