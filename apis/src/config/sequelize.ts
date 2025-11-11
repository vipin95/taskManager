import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DATABASE_NAME as string, process.env.DB_USER as string, process.env.PASSWORD as string, {
    host: process.env.HOST,
    dialect: 'mysql'
});
const checkConnection = async ()=> {
    try {
       await sequelize.authenticate();
       console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
checkConnection();

export default sequelize;