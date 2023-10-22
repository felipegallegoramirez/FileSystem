const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();
const user = Joi.array().items(Joi.string());

const createRolSchema = Joi.object({
  name:name.required() ,
  user:user.required(),
});


const updateRolSchema = Joi.object({
  id:id ,
  name:name ,
  user:user,
});

const getRolSchema = Joi.object({
  id: id.required(),
});



module.exports = { createRolSchema, updateRolSchema, getRolSchema}
