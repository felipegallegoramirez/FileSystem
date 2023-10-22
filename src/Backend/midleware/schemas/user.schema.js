const Joi = require('joi');

const id = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8).max(20);
const rol = Joi.array().items(Joi.string());
const files_id = Joi.array().items(Joi.string());
const post_id = Joi.array().items(Joi.string());
const verified = Joi.any()
const ips = Joi.array().items(Joi.string());

const createUserSchema = Joi.object({
  id:id.required() ,
  email:email.required() ,
  password:password.required(),
  rol:rol.required() ,
  files_id:files_id.required() ,
  post_id:post_id.required() ,
  verified:verified.required() ,
  ips:ips.required() 
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
