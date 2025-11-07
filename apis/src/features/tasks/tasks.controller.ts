import { type Request, type Response, type NextFunction } from "express";
import {getTasks,
    postTasks,
    putTasks,
    deleteTasks} from "./tasks.service";

const listTask = async (req: Request, res : Response, next: NextFunction)=>{
    try{
        const user_id = req.cookies.id;
        const tasksList = await getTasks(user_id);
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
const FetchTask = async (req: Request, res : Response, next: NextFunction)=>{
    try{
        const user_id = req.cookies.id;
        const id = parseInt(req.params.id);
        const tasksList = await getTasks(user_id, id);
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
const addTask = async (req: Request, res : Response, next: NextFunction)=>{
    try{
        let user_id = req.cookies.id;
        const tasksList = await postTasks(user_id, req.body);
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
const updatetask = async (req: Request,res : Response, next: NextFunction)=>{
    try{
        console.log(req.body);
        const tasksList = await putTasks(req.body);
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
const deleteTask = async (req: Request,res : Response, next: NextFunction)=>{
    try{
        const id = parseInt(req.params.id);
        console.log(typeof id);
        const tasksList = await deleteTasks(id);
        res.status(200).json("tasksList");
    }catch(error){
        next(error);
    }
};
export {
    listTask, 
    addTask, 
    updatetask, 
    deleteTask,
    FetchTask
};