const express = require("express");
const router = express.Router();
const file = require("../controllers/file.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createFileSchema , updateFileSchema , getFileSchema, createAdmonSchema} = require("../midleware/schemas/file.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/:id",checkpermision(1),validatorHandler(getFileSchema, 'params'), file.getFiles); 
router.post("/",checkpermision(1),validatorHandler(createFileSchema, 'body'), file.createFile); 
router.delete("/:id",checkpermision(1),validatorHandler(getFileSchema, 'params'), file.deleteFile);


module.exports = router 