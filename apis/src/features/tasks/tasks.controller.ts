import { type Request, type Response, type NextFunction } from "express";
import {getTasks,
    postTasks,
    putTasks,
    deleteTasks} from "./tasks.service.ts";

const listTask = async (req: Request, res : Response, next: NextFunction)=>{
    try{
        const tasksList = await getTasks();
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
const addTask = async (req: Request, res : Response, next: NextFunction)=>{
    try{
        const tasksList = await postTasks(req.body);
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
const updatetask = async (req: Request,res : Response, next: NextFunction)=>{
    try{
        const tasksList = await putTasks(req.body);
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
const deleteTask = async (req: Request,res : Response, next: NextFunction)=>{
    try{
        const tasksList = await deleteTasks(req.body);
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
export {
    listTask, 
    addTask, 
    updatetask, 
    deleteTask
};