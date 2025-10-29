// import modules
const express = require('express');
const app = express();
const registerRoutes = require('./src/routes');
require('dotenv').config();

// Port Define
const PORT = process.env.PORT || 3000;

// Calling methods that registring routes as middleware
registerRoutes(app);

// Middleware 
app.use((err, req, res, next)=>{
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