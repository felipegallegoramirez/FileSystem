const express = require("express");
const router = express.Router();
const post = require("../controllers/post.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createPostSchema , updatePostSchema , getPostSchema, createAdmonSchema} = require("../midleware/schemas/post.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/",checkpermision(1000), post.getPosts);
router.get("/:id",checkpermision(3),validatorHandler(getPostSchema, 'params'), post.getPost); 
router.delete("/:id",checkpermision(3),validatorHandler(getPostSchema, 'params'), post.deletePost);


module.exports = router 