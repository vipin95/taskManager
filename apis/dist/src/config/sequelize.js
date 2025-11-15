"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const sequelize = new Sequelize(
//     process.env.DATABASE_NAME as string, 
//     process.env.DB_USER as string, 
//     process.env.PASSWORD as string, 
//     {
//          host: process.env.HOST,
//          dialect: 'mysql'
//     }
// );
// const sequelize = new Sequelize(process.env.URI as string);
const sequelize = new sequelize_1.Sequelize(process.env.URI, {
    dialect: "mysql", // ✅ explicitly define it, just to be safe
    dialectOptions: {
        connectTimeout: 60000, // optional (helps with Railway slow connections)
    },
    logging: false, // optional
});
const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully ( Sequelize )');
    }
    catch (error) {
        console.error('Unable to connect to the database ( Sequelize ):', error);
        return error;
    }
};
checkConnection();
exports.default = sequelize;
