// import modules

import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV;
const envPath = path.resolve(process.cwd(), `.env.${env}`);
dotenv.config({ path: envPath });

import express, {type Request, type Response, type NextFunction } from "express";
import registerRoutes from "./src/routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
// Port Define
const PORT = process.env.PORT || 4000;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.get("/set-cookie", (req, res) => {
    let id = `guest_${Math.random().toString(36).substr(2, 9)}`;
    res.cookie('id', id, {
        secure: false,
        sameSite: 'lax',  // Works on HTTP
        path: '/',        // Available everywhere
      });
    res.cookie('username','Guest', {
        secure: false,
        sameSite: 'lax',  // Works on HTTP
        path: '/',        // Available everywhere
      });
    res.json({ message: "Cookie set successfully!" });
});

// Calling methods that registring routes as middleware
app.use(express.json());
registerRoutes(app);

  
// Middleware 
app.use((err: any, req: Request, res: Response, next: NextFunction)=>{
    console.log("Error", err);
    res.status(500).json({
        "Message" : "Internal server Error",
        "Error" : err.message
    })
});
// Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT} In ${process.env.NODE_ENV}`);
});