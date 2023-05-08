import Joi from 'joi';

export const segmentTypeSchema = Joi.object({
  aggregation_type: Joi.string().required(),
});
