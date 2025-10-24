// import modules
const express = require('express');
const app = express();
const routes = require('./routes');
// Port Define
const PORT = 80;

//routes middleware registerd
app.use("/",routes); 

// Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});