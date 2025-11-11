import { type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
// import db from "../../config/db_config";

const signUp = (req: Request, res: Response, next:NextFunction)=>{
    /*  1. data received
        2. add auth service
    */ 
        let password = bcrypt.hash(req.body.password, 14),
            email = req.body.email;

    try {
        res.status(200).json(req.body);
    } catch (error) {
        next(error);
    }
}
const login = (req: Request, res: Response, next:NextFunction)=>{
    try{
        res.status(200).json(req.body);
    }catch(error){
        next(error);
    }
}

export {
    signUp,
    login
}