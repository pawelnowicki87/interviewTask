import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";


export const Message = sequelize.define("message", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})
