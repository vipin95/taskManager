// const db = require('../../config/db_config');
// import db from "../../config/db_config";
import Task from "../../model/sequelize";

const getTasks = async ()=>{
    const rows = await Task.findAll();
    return rows;
}
const postTasks = async ({name, description}:{name:string, description:string})=>{
    const newTask = await Task.create({
        name,
        description
      });
    return {
        message: "Task created successfully",
        task: newTask,
        };
}
const putTasks = async ({name, description, id}:{name:string, description:string, id:number})=>{
    const affectedRows = await Task.update(
        { name, description },
        { where: { id } }
    );
    return {
        "Message": "Record Updated",
        "affectedRows" :affectedRows
    };
}
const deleteTasks = async ({id}:{id:number})=>{
    const deletedTaskmess = await Task.destroy({where:{id}})
    return {
        "Message" : "Row deleted",
        "NumberOfDeletedTask" : deletedTaskmess
    };
}

export{
    getTasks,
    postTasks,
    putTasks,
    deleteTasks
}