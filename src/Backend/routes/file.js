const express = require("express");
const router = express.Router();
const file = require("../controllers/file.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createFileSchema , updateFileSchema , getFileSchema, createAdmonSchema} = require("../midleware/schemas/file.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/",checkpermision(1000), file.getFiles);
router.get("/:id",checkpermision(2),validatorHandler(getFileSchema, 'params'), file.getFile); 
router.delete("/:id",checkpermision(2),validatorHandler(getFileSchema, 'params'), file.deleteFile);


module.exports = router 