import { type Request, type Response, type NextFunction } from "express";
import {getTasks,
    postTasks,
    putTasks,
    deleteTasks} from "./tasks.service";
import jwt from "jsonwebtoken";

const listTask = async (req: Request, res : Response, next: NextFunction)=>{
    try{
        const cookie_payload : any = await jwt.decode(req.cookies.token);
        const user_id = cookie_payload?.id;
        const tasksList = await getTasks(user_id);
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
const FetchTask = async (req: Request, res : Response, next: NextFunction)=>{
    try{
        const cookie_payload : any = await jwt.decode(req.cookies.token);
        const user_id = cookie_payload.id;
        const id = parseInt(req.params.id);
        const tasksList = await getTasks(user_id, id);
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
const addTask = async (req: Request, res : Response, next: NextFunction)=>{
    try{
        const cookie_payload : any = await jwt.decode(req.cookies.token);
        const user_id = cookie_payload.id;
        const tasksList = await postTasks(user_id, req.body);
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
        const id = parseInt(req.params.id);
        await deleteTasks({"id": id});
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