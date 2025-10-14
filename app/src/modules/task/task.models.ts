/**
 * USER MODEL
 * ==========
 * Defines the structure of the 'user' table in the database.
 * This is NOT a DAO - it only defines the schema/structure.
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";

// Define what attributes the User table has
export interface UserAttributes {
    user_id: number;
    username: string;
    useremail: string;
    password: string;
}

// For creation, user_id is optional (auto-generated)
export interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}

// Sequelize Model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number;
    public username!: string;
    public useremail!: string;
    public password!: string;

    // Timestamps
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Initialize the model with Sequelize
User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        useremail: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Built-in email validation
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "user",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default User;