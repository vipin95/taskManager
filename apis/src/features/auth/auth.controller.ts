import { type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import Users from "../../model/sequelize_user";

const signUp = async (req: Request, res: Response, next:NextFunction)=>{
    /*  1. data received
        2. Basic( hash ) Auth added
        todo: add email already exist or not check perform;
    */ 
    try {
        let password = await bcrypt.hash(req.body.password, 14),
            email = req.body.email;
            let result = await Users.create({"password": password, "email":email});
            res.send(result);
    } catch (error) {
        next(error);
    }
}
const login = async (req: Request, res: Response, next:NextFunction)=>{
    try{
        let password = req.body.password,
            email = req.body.email;

        let hashed = await Users.findOne({
            where:{"email": email}
        });
        if(hashed){
            let result = await bcrypt.compare(password, hashed?.getDataValue('password'));
            res.send(result);
        }else{
            res.send(
                "Invalid User!"
            );
        }
    }catch(error){
        next(error);
    }
}

export {
    signUp,
    login
}