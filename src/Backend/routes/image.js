const express = require("express");
const router = express.Router();
const image = require("../controllers/image.controller")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/",checkpermision(10), image.saveData);


module.exports = router 