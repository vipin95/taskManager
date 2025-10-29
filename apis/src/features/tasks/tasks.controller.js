const {fetchTasks} = require('./tasks.service');

const listTask = async (req,res, next)=>{
    try{
        const tasksList = await fetchTasks();
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};

module.exports ={
    listTask
}