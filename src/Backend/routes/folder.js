const express = require("express");
const router = express.Router();
const folder = require("../controllers/folder.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createFolderSchema , updateFolderSchema , getFolderSchema, createAdmonSchema} = require("../midleware/schemas/folder.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/",checkpermision(1000), folder.getFolders);
router.get("/:id",checkpermision(1),validatorHandler(getFolderSchema, 'params'), folder.getFolder); 
router.delete("/:id",checkpermision(1),validatorHandler(getFolderSchema, 'params'), folder.deleteFolder);


module.exports = router 