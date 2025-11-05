// const db = require('../../config/db_config');
import db from "../../config/db_config";

const getTasks = async ()=>{
    const [rows] = await db.query(
        "SELECT *, DATE_FORMAT(created_at, '%d %b %Y') AS created_at, DATE_FORMAT(updated_at, '%d %b %Y') AS updated_at FROM tasks;");
    return rows;
}
const postTasks = async ({name, description}:{name:string, description:string})=>{
    let sql = "INSERT INTO tasks (name, description) VALUES (?, ?)";
    let params = [name, description]
    const [rows] = await db.query(sql, params);
    return rows;
}
const putTasks = async ({name, description, id}:{name:string, description:string, id:number})=>{
    const sql = "UPDATE tasks SET name = ?, description = ? WHERE id = ?";
    const params = [name, description, id];
    const [rows] = await db.query(sql, params);
    return rows;
}
const deleteTasks = async ({id}:{id:number})=>{
    const [rows] = await db.query("DELETE FROM tasks WHERE id=?",[id]);
    return rows;
}

export{
    getTasks,
    postTasks,
    putTasks,
    deleteTasks
}