const Joi = require('joi');

const id = Joi.string();
const url = Joi.string();
const name = Joi.string();
const owner = Joi.string();


const createFileSchema = Joi.object({
  _id:Joi.any(),
  name:name.required(),
  url:url.required() ,
  owner:owner.required(),
});



const updateFileSchema = Joi.object({
  id:id ,
  name:name,
  url:url ,
  owner:owner,
});

const getFileSchema = Joi.object({
  id: id.required(),
});



module.exports = { createFileSchema, updateFileSchema, getFileSchema}
