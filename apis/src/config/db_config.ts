// TODO: need to check is it creating a new connection without closing the old one on restart
//       Where should i import it and how to use it wisly.
import mysql from "mysql2/promise";

// const db = mysql.createPool({  // what is create pool and how many other are here totel to coonect with db
//   host: process.env.HOST,
//   user: process.env.DB_USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,   // Max number of connections
//   queueLimit: 0          // 0 = no limit for queued requests
// });
const db = mysql.createPool({
  uri: process.env.URI,  // ← Railway gives this
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
async function initDB() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      user_id INT,
      guest_user_id VARCHAR(100),
      status ENUM('todo', 'in_progress','delayed','cancelled', 'completed') DEFAULT 'todo',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Tables created or verified.");
}

initDB();

(async () => {
    try {
      const connection = await db.getConnection(); // get a connection from pool
      console.log('✅ Database connected successfully');
      connection.release(); // release connection back to pool
    } catch (err:any) {
      console.error('❌ Database connection failed:', err.message);
    }
  })();

export default db;