const express = require("express");
const router = express.Router();
const image = require("../controllers/image.controller")
const {checkAuth , checkpermision} = require('../midleware/authverify')
const { uploadimage } = require("../utils/savestorage")

router.post("/",checkpermision(10),uploadimage.single('image'), image.saveData);
router.put("/:act",checkpermision(10),uploadimage.single('image'), image.saveData);


module.exports = router 