const express = require("express");
let router = express.Router();

router.get('/', (req,res)=>{
    res.send("get request");
});
router.post('/', (req,res)=>{
    res.send("post request");
});

module.exports = router;