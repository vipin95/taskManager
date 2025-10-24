const express = require('express');
let router = express.Router();

router.get('/',(req, res)=>res.send("Get request"));
router.post('/',(req, res)=>res.send("It's a post request"));

module.exports = router;