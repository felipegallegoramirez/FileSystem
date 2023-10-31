const Joi = require('joi');

const id = Joi.string();
const title = Joi.string();
const description = Joi.string();
const images = Joi.array().items(Joi.string());
const text = Joi.array().items(Joi.string());
const order = Joi.array().items(Joi.string());
const owner = Joi.string();

const createPostSchema = Joi.object({
  _id:Joi.any(),
  title:title.required() ,
  description:description.required(),
  images:images.required() ,
  text:text.required() ,
  order:order.required() ,
  owner:owner.required() 
});


const updatePostSchema = Joi.object({
  id:id ,
  title:title ,
  description:description,
  images:images ,
  text:text ,
  order:order ,
  owner:owner 
});

const getPostSchema = Joi.object({
  id: id.required(),
});



module.exports = { createPostSchema, updatePostSchema, getPostSchema }
