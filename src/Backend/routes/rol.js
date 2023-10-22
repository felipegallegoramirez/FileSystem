const express = require("express");
const router = express.Router();
const rol = require("../controllers/rol.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createRolSchema , updateRolSchema , getRolSchema, createAdmonSchema} = require("../midleware/schemas/rol.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/",checkpermision(1000), rol.getRols);
router.get("/:id",checkpermision(2),validatorHandler(getRolSchema, 'params'), rol.getRol); 
router.delete("/:id",checkpermision(2),validatorHandler(getRolSchema, 'params'), rol.deleteRol);


module.exports = router 