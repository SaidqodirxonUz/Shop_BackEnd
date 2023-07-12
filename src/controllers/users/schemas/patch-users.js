const Joi = require("joi");

exports.patchUsersSchema = Joi.object({
  full_name: Joi.string(),
  phone_number: Joi.string(),
  email: Joi.string(),
  password: Joi.string().min(8),
  adress: Joi.string(),
  role: Joi.string().valid("admin"),
});
