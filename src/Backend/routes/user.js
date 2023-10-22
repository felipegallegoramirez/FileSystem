const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createUserSchema , updateUserSchema , getUserSchema, createAdmonSchema} = require("../midleware/schemas/user.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/",checkpermision(0), user.getUsers);
router.get("/:id",checkpermision(0),validatorHandler(getUserSchema, 'params'), user.getUser); 
router.delete("/:id",checkpermision(0),validatorHandler(getUserSchema, 'params'), user.deleteUser);


module.exports = router;