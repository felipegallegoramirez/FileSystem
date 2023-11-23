const Joi = require('joi');

const id = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(0).max(200);
const rol = Joi.array().items(Joi.string());
const permissions = Joi.array().items(Joi.number());
const files_id = Joi.array().items(Joi.string());
const post_id = Joi.array().items(Joi.string());
const verified = Joi.any()
const ips = Joi.array().items(Joi.string());

const createUserSchema = Joi.object({
  email:email.required() ,
  password:password.required(),
  rol:rol.required() ,
  files_id:files_id.required() ,
  post_id:post_id.required() ,
  permissions:permissions.required(),
});

const LoginUserSchema  = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  id:id ,
  email:email ,
  password:password,
  rol:rol ,
  files_id:files_id ,
  post_id:post_id ,
  verified:verified ,
  ips:ips 
});

const getUserSchema = Joi.object({
  id: id.required(),
});



module.exports = { createUserSchema, updateUserSchema, getUserSchema, LoginUserSchema }
