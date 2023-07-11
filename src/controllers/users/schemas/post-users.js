const Joi = require("joi");

exports.postUsersSchema = Joi.object({
  full_name: Joi.string(),
  phone_number: Joi.string(),
  password: Joi.string().min(8),
  role: Joi.string().valid("super_admin", "admin", "user"),
});
