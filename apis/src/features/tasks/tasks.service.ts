import db from "../../config/db_config";

const getTasks = async (isGuest:boolean, user_id:string | number, id?:number)=>{
    try {
        let userKey;
        if(isGuest) userKey="guest_user_id";
        else userKey="user_id";
        var sql;
        if(id){
            sql = `SELECT *, DATE_FORMAT(created_at, '%d %b %Y') AS created_at, DATE_FORMAT(updated_at, '%d %b %Y') AS updated_at FROM 
            tasks WHERE ${userKey}="${user_id}" AND tasks.id="${id}"`;
        }else{
            sql = ` SELECT status, COUNT(*) AS count FROM tasks WHERE ${userKey}="${user_id}" GROUP BY status;
            SELECT *, DATE_FORMAT(created_at, '%d %b %Y') AS created_at_formatted, DATE_FORMAT(updated_at, '%d %b %Y') AS updated_at_formatted FROM 
            tasks WHERE ${userKey}="${user_id}" ORDER BY updated_at DESC`;
        }
        const [rows] = await db.query(sql);
        return rows;
    } catch (error) {
        return error;
    }
}
const postTasks = async (isGuest:boolean, id:string | number, {name, description}:{name:string, description:string})=>{
    try {
        let userKey;
        if(isGuest) userKey="guest_user_id";
        else userKey="user_id";
        let sql = `INSERT INTO tasks (name, description, ${userKey}) VALUES (?, ?, ?)`;
        let params = [name, description, id]
        const [rows] = await db.query(sql, params);
        return rows;
    } catch (error) {
        return error;
    }
    
}
const putTasks = async ({name, description, status , id}:{name:string, description:string, status:string, id:number})=>{
    try {
        let keys ="";
        let  params = [];
        if(id){
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
            const [rows] = await db.query(sql, params);
            return rows;
        }else{
            return "One of the most importent Field mission";
        }
    } catch (error) {
        return error;
    }
}
const deleteTasks = async ({user_id, id}:{user_id?:string|number, id?: number})=>{
    try {
        let query;
        let queryData;
        if(user_id){
            query = "DELETE FROM tasks WHERE guest_user_id=?";
            queryData= user_id;
        }else if(id){
            query = "DELETE FROM tasks WHERE id=?"
            queryData= id;
        }else{
            return "Query data issue";
        }
        const [rows] = await db.query(query,[queryData]);
        return rows;
    } catch (error) {
        return error;
    }
}

export{
    getTasks,
    postTasks,
    putTasks,
    deleteTasks
}