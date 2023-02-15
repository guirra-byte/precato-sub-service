import * as Joi from 'joi';

const pattern = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;

export const CreateSubSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(new RegExp(JSON.stringify(pattern))),
});
