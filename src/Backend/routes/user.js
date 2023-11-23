const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createUserSchema , updateUserSchema , getUserSchema, createAdmonSchema} = require("../midleware/schemas/user.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/",checkpermision(1), user.getUsers);
router.get("/:id",checkpermision(1),validatorHandler(getUserSchema, 'params'), user.getUser); 
router.delete("/:id",checkpermision(0),validatorHandler(getUserSchema, 'params'), user.deleteUser);
router.put("/:id",checkpermision(0), user.editUser); 
router.post("/",checkpermision(0), user.createUser);


module.exports = router;