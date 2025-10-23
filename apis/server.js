// import modules
const express = require('express');
const app = express();

// Port Define
const PORT = 80;

// Define Routes
app.get('/', (req, res)=>{
    res.send("You have successfully hit your first API.");
})
app.get('/data', (req, res)=>{
    res.json([
        {
            "name":"Vipin", 
            "age":30
        },
        {
            "name":"Vinay", 
            "age":35
        },
        {
            "name":"Nitin", 
            "age":31
        },
    ]);
})

// Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})