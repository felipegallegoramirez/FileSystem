const Joi = require('joi');

const id = Joi.string();
const url = Joi.string();
const owner = Joi.string();


const createFileSchema = Joi.object({
  url:url.required() ,
  owner:owner.required(),
});



const updateFileSchema = Joi.object({
  id:id ,
  url:url ,
  owner:owner,
});

const getFileSchema = Joi.object({
  id: id.required(),
});



module.exports = { createFileSchema, updateFileSchema, getFileSchema}
