import { type Request, type Response, type NextFunction } from "express";
import {getTasks,
    postTasks,
    putTasks,
    deleteTasks} from "./tasks.service";
import jwt from "jsonwebtoken";
import Users from "../../model/sequelize_user";

const listTask = async (req: Request, res : Response, next: NextFunction)=>{
    try{
        const cookie_payload : any = await jwt.decode(req.cookies.token);
        const user_id = cookie_payload?.id;
        const isGuest = cookie_payload.isGuest;
        const tasksList = await getTasks(isGuest, user_id);
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
        const isGuest = cookie_payload.isGuest;
        const tasksList = await getTasks(isGuest, user_id, id);
        res.status(200).json(tasksList);
    }catch(error){
        next(error);
    }
};
const addTask = async (req: Request, res : Response, next: NextFunction)=>{
    try{
        const cookie_payload : any = await jwt.decode(req.cookies.token);
        const user_id = cookie_payload.id;
        const isGuest = cookie_payload.isGuest;
        const tasksList = await postTasks(isGuest, user_id, req.body);
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
const mySelf = async (req: Request,res : Response, next: NextFunction)=>{
    try{
        const cookie_payload : any = await jwt.decode(req.cookies.token);
        const user_id = cookie_payload.id;
        const isGuest = cookie_payload.isGuest;
        var user;
        if(!isGuest){
            user = await Users.findOne({
                where:{"id": user_id}
            });
            if(user) res.json({status:"200", data: user});
            else res.status(401).json("Invalid User!");
        }else{
            res.status(401).json("Invalid User.");
        }
    }catch(error){
        next(error);
    }
};
export {
    listTask, 
    addTask, 
    updatetask, 
    deleteTask,
    FetchTask,
    mySelf
};