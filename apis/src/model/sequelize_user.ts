import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const Users = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type:DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type:DataTypes.STRING(255),
        allowNull: false
    }
},{
    tableName : "users",
    timestamps: false,
    underscored: true
});

export default Users