// First load the enviorment before anything
import dotenv from "dotenv";
import path from "path";
const env = process.env.NODE_ENV;
const envPath = path.resolve(process.cwd(), `.env.${env}`);
dotenv.config({ path: envPath });

import express, {type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import registerRoutes from "./src/routes/index";
import passport from "./src/config/google_SSO";
const app = express();
const PORT = process.env.PORT || 4001; // Port Define

app.use(passport.initialize());
app.use(cookieParser());
const allowedOrigins = [
    'https://taskmanager-ec96a.web.app',
    'http://localhost:3000',
    // add more as needed
];
app.use(
    cors({
      origin: (origin, callback) => {
        // Allow non-browser requests (e.g., Postman, mobile native apps) – no origin header
        if (!origin) {
          return callback(null, ''); // or any string; some use 'true' here but better to use a dummy or fix client
        }
  
        if (allowedOrigins.includes(origin)) {
          return callback(null, origin); // ← Reflect the exact origin string
        }
  
        return callback(new Error('Not allowed by CORS')); // Blocks with error
      },
      credentials: true,
    })
  );
// app.use(
//     cors({
//       origin: (origin, callback) => callback(null, true),
//       credentials: true,
//     })
// );
app.get("/",(req:Request, res:Response)=>{
    res.send("Server working fine");
});
// Calling methods that registring routes as middleware
app.use(express.json());
registerRoutes(app);  // Registring all the routes here

// Global Error handler middleware
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