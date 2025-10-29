const db = require('../../models/db_config');

const fetchTasks = async ()=>{
    const [rows] = await db.query("SELECT * FROM tasks;");
    return rows;
}

module.exports = {
    fetchTasks
}