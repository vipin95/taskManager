const express = require("express");
let router = express.Router();
const {listTask} = require("./tasks.controller");

router.get('/', listTask);
router.post('/', (req,res)=>{
    res.send("post request");
});
router.put('/', (req, res)=>{
    res.send("Update request");
})
router.delete('/', (req, res)=>{
    res.send("Delete request");
})
module.exports = router;