const express = require("express");
const router = express.Router();
const {loginCtrl , message,checklogin,admon} = require("../controllers/login.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {LoginUserSchema} = require("../midleware/schemas/user.schema")


router.post("/",validatorHandler(LoginUserSchema,"body"), loginCtrl);
router.post("/r/:id",message);
router.post("/a",admon);
router.post("/log",checklogin);



module.exports = router 