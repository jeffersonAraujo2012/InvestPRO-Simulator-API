import Joi from "joi";

const genericModelIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export default genericModelIdSchema;