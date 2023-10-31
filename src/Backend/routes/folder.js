const express = require("express");
const router = express.Router();
const folder = require("../controllers/folder.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createFolderSchema , updateFolderSchema , getFolderSchema, createAdmonSchema} = require("../midleware/schemas/folder.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/:id",checkpermision(10), folder.getFolders);
router.post("/",checkpermision(10),validatorHandler(createFolderSchema, 'body'), folder.createFolder);
router.put("/:id",checkpermision(1),validatorHandler(updateFolderSchema, 'body'), folder.editFolder);
router.get("/one/:id/",checkpermision(1),validatorHandler(getFolderSchema, 'params'), folder.getFolder); 
router.delete("/:id",checkpermision(1),validatorHandler(getFolderSchema, 'params'), folder.deleteFolder);


module.exports = router 