// import modules
const express = require('express');
const app = express();
const registerRoutes = require('./routes');

// Port Define
const PORT = 3000;

// Calling methods that registring routes as middleware
registerRoutes(app);

// Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});