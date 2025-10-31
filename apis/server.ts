// import modules
import "dotenv/config";
import express, {type Request, type Response, type NextFunction } from "express";
import registerRoutes from "./src/routes/index";
const app = express();

// Port Define
const PORT = process.env.PORT || 3000;

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
    console.log(`Server is running at http://localhost:${PORT}`);
});