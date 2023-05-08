import Joi from 'joi';

export const segmentSubSchema = Joi.object({
  aggregation_type: Joi.string().required(),
});
