import { type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import Users from "../../model/sequelize_user";
import JWT from "jsonwebtoken";
import passport from "../../config/google_SSO";
import { deleteTasks } from "../tasks/tasks.service";
import jwt from "jsonwebtoken";

const signUp = async (req: Request, res: Response, next:NextFunction)=>{
    /*  1. data received
        2. Basic( hash ) Auth with JWT added
        todo: add email already exist or not check perform;
    */ 
    try {
        let User = await Users.findOne({
            where:{"email": req.body.email}
        });
        if(!User){
            let password = await bcrypt.hash(req.body.password, 14),
                email = req.body.email;
            await Users.create({"password": password, "email":email});
            res.status(201).json({"message": "User Created Successfully!"});
        }else{
            res.status(401).json("User already Exist!");
        }
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
            let isAuth = await bcrypt.compare(password, hashed.getDataValue('password'));
            if(isAuth){
                let token = JWT.sign({"id" : hashed?.getDataValue('id')}, process.env.JWT_SECRET_KEY as string, { expiresIn: '30d' });
                res.cookie('username', hashed?.getDataValue('name')+"", {
                    secure: false,
                    sameSite: 'lax',  // Works on HTTP
                    path: '/',        // Available everywhere
                });
                res.cookie('token',token, {
                    secure: false,
                    sameSite: 'lax',  // Works on HTTP
                    path: '/',        // Available everywhere
                });
                res.status(200).json({"message": "Successfully login"});
            }else{
                res.status(401).json("Invalid User!");
            }
        }else{
            res.send(
                "Invalid User!"
            );
        }
    }catch(error){
        next(error);
    }
}
// if Token then Valid
// how to know user( then make id available & name ) is guest or normal
const redirectToGoogle = async (req: Request, res: Response)=>{
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
}
const google = async (req: Request, res: Response, next: NextFunction)=>{
    // TODO: retive data and pass JWT token to user
    try {
        passport.authenticate("google", { session: false }, (err, user) => {
            if (err || !user) {
                return res.redirect(`${process.env.CLIENT_URL}/login`); 
            }
            let id = `guest_${Math.random().toString(36).substr(2, 9)}`;
            let token = JWT.sign({"id" : id}, process.env.JWT_SECRET_KEY as string, { expiresIn: '30d' });

            res.cookie('username', user.name, {
                secure: false,
                sameSite: 'lax',  // Works on HTTP
                path: '/',        // Available everywhere
            });
            res.cookie('token',token, {
                secure: false,
                sameSite: 'lax',  // Works on HTTP
                path: '/',        // Available everywhere
            });    
            res.redirect(`${process.env.CLIENT_URL}/list`);
        })(req, res, next);
    } catch (error) {
        next(error);
    }
}
const logout = async (req: Request, res: Response)=>{
    try {
        const cookie_payload : any = await jwt.decode(req.cookies.token);
        if( !cookie_payload ) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user_id = cookie_payload?.id;
        await deleteTasks({"user_id": user_id});
        res.clearCookie('sessionId', {
            path: '/',
            sameSite: 'none',
            secure: true
        });
        res.clearCookie('username', {
            path: '/',
            sameSite: 'none',
            secure: true
        });
        res.clearCookie('token', {
            path: '/',
            sameSite: 'none',
            secure: true
        });
        // TODO: clear all data from database al well
        res.send("Cookie deleted");
    } catch (error) {
        throw error;
    }
}
const guestLogin = async (req: Request, res: Response)=>{

    let id = `guest_${Math.random().toString(36).substr(2, 9)}`;
    let token = JWT.sign({"id" : id}, process.env.JWT_SECRET_KEY as string, { expiresIn: '30d' });
    res.cookie('sessionId', 'guest123', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',  // Works on HTTP
        path: '/', 
        maxAge:30*24*3600*1000       // Available everywhere
    });
    res.cookie('username','Guest', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',  // Works on HTTP
        path: '/', 
        maxAge:30*24*3600*1000       // Available everywhere
    });
    res.cookie('token',token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',  
        maxAge:30*24*3600*1000
    });
    res.status(200).json({ message: "Login successfully." });
}

export {
    signUp,
    login,
    google,
    redirectToGoogle,
    guestLogin,
    logout
}