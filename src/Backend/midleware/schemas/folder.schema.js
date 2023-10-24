const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();
const image = Joi.string();
const rol = Joi.array().items(Joi.string());
const users = Joi.array().items(Joi.string());
const files_id = Joi.array().items(Joi.string());
const owner = Joi.string();

const createFolderSchema = Joi.object({
  _id:Joi.any(),
  name:name.required(),
  image:image.required() ,
  rol:rol,
  users:users ,
  files_id:files_id ,
  owner:owner.required() 
});


const updateFolderSchema = Joi.object({
  _id:id ,
  name:name,
  image:image,
  rol:rol,
  users:users,
  files_id:files_id,
  owner:owner 
});

const getFolderSchema = Joi.object({
  id: id.required(),
});



module.exports = { createFolderSchema, updateFolderSchema, getFolderSchema }
