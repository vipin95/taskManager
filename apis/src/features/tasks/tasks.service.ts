// const db = require('../../config/db_config');
import db from "../../config/db_config.ts";

const getTasks = async ()=>{
    const [rows] = await db.query("SELECT * FROM tasks;");
    return rows;
}
const postTasks = async ({name, description})=>{
    let sql = "INSERT INTO tasks (name, description) VALUES (?, ?)";
    let params = [name, description]
    const [rows] = await db.query(sql, params);
    return rows;
}
const putTasks = async ({name, description, id})=>{
    const sql = "UPDATE tasks SET name = ?, description = ? WHERE id = ?";
    const params = [name, description, id];
    const [rows] = await db.query(sql, params);
    return rows;
}
const deleteTasks = async ({id})=>{
    const [rows] = await db.query("DELETE FROM tasks WHERE id=?",[id]);
    return rows;
}

export{
    getTasks,
    postTasks,
    putTasks,
    deleteTasks
}