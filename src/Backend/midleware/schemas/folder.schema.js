const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();
const image = Joi.string();
const rol = Joi.array().items(Joi.string());
const users = Joi.array().items(Joi.string());
const files_id = Joi.array().items(Joi.string());
const owner = Joi.string();

const createPostSchema = Joi.object({
  name:name.required(),
  image:image.required() ,
  rol:rol.required() ,
  users:users.required() ,
  files_id:files_id.required() ,
  owner:owner.required() 
});


const updatePostSchema = Joi.object({
  id:id ,
  name:name,
  image:image,
  rol:rol,
  users:users,
  files_id:files_id,
  owner:owner 
});

const getPostSchema = Joi.object({
  id: id.required(),
});



module.exports = { createPostSchema, updatePostSchema, getPostSchema }
