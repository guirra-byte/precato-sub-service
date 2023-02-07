import joi from 'joi';

export const CreateSubSchema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .required()
    .regex(/[^\s@]+@[^\s@]+\.[^\s@]+/gi),
});
