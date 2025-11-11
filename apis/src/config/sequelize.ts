import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//     process.env.DATABASE_NAME as string, 
//     process.env.DB_USER as string, 
//     process.env.PASSWORD as string, 
//     {
//          host: process.env.HOST,
//          dialect: 'mysql'
//     }
// );
const sequelize = new Sequelize(process.env.URI as string);
const checkConnection = async ()=> {
    try {
       await sequelize.authenticate();
       console.log('✅ Database connected successfully ( Sequelize )');
    } catch (error) {
        console.error('Unable to connect to the database ( Sequelize ):', error);
        return error;
    }
}
checkConnection();

export default sequelize;