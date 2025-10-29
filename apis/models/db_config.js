// TODO: need to check is it creating a new connection without closing the old one on restart
//       Where should i import it and how to use it wisly.
const mysql = require('mysql2/promise');

const db = mysql.createPool({  // what is create pool and how many other are here totel to coonect with db
    root: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,   // Max number of connections
    queueLimit: 0          // 0 = no limit for queued requests
});
(async () => {
    try {
      const connection = await db.getConnection(); // get a connection from pool
      console.log('✅ Database connected successfully');
      connection.release(); // release connection back to pool
    } catch (err) {
      console.error('❌ Database connection failed:', err.message);
    }
  })();
// db.connect((error)=>{
//     // TODO: Need to refine message text;
//     if(error) console.log("Database issue",error.message);
//     else console.log("Database connection Successfully",db.threadId);
// })

module.exports = db;