import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

const authCheck = async (req: Request, res : Response, next: NextFunction) => {
    
    try {
        const token = req.cookies.token;
        if(!token) return res.status(500).json({ 
            success: false,
            message: "Token missing"
        });
        await jwt.verify(token, process.env.JWT_SECRET_KEY!);
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Invalid token' });
    }
}

export default authCheck;