import db from "../../config/db_config";

const getTasks = async (user_id:string, id?:number)=>{
    var sql;
    if(id){
        sql = `SELECT *, DATE_FORMAT(created_at, '%d %b %Y') AS created_at, DATE_FORMAT(updated_at, '%d %b %Y') AS updated_at FROM tasks WHERE guest_user_id="${user_id}" AND tasks.id="${id}"`;
    }else{
        sql = `SELECT *, DATE_FORMAT(created_at, '%d %b %Y') AS created_at, DATE_FORMAT(updated_at, '%d %b %Y') AS updated_at FROM tasks WHERE guest_user_id="${user_id}"`;
    }
    const [rows] = await db.query(sql);
    return rows;
}
const postTasks = async (id:string, {name, description}:{name:string, description:string})=>{
    let sql = `INSERT INTO tasks (name, description, guest_user_id) VALUES (?, ?, ?)`;
        let params = [name, description, id]
        const [rows] = await db.query(sql, params);
        return rows;
    
}
const putTasks = async ({name, description, status , id}:{name:string, description:string, status:string, id:number})=>{
    let keys ="";
    let  params = [];
    if(name) {
        keys += "name=?,";
        params.push(name);
    };
    if(description){
        if(description && status){
            keys += "description=?,";
            params.push(description);
        }else{
            keys += "description=?";
            params.push(description);
        }
    }
    if(status){
        keys += "status=?";
        params.push(status);
    }
    params.push(id);
    const sql = `UPDATE tasks SET ${keys} WHERE id = ?`;
    console.log(sql, params);
    const [rows] = await db.query(sql, params);
    return rows;
}
const deleteTasks = async (id:number)=>{
    const [rows] = await db.query("DELETE FROM tasks WHERE id=?",[id]);
    return rows;
}

export{
    getTasks,
    postTasks,
    putTasks,
    deleteTasks
}