const express = require("express");
const router = express.Router();
const rol = require("../controllers/rol.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createRolSchema , updateRolSchema , getRolSchema} = require("../midleware/schemas/rol.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/",checkpermision(10), rol.getRols);
router.post("/",checkpermision(0),validatorHandler(createRolSchema), rol.createRol)
router.put("/:id",checkpermision(0),validatorHandler(updateRolSchema), rol.editRol)
router.get("/:id",checkpermision(0),validatorHandler(getRolSchema, 'params'), rol.getRol); 
router.delete("/:id",checkpermision(0),validatorHandler(getRolSchema, 'params'), rol.deleteRol);


module.exports = router 