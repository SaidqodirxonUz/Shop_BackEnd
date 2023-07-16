const Joi = require("joi");

exports.postCategoriesSchema = Joi.object({
  uz_category_name: Joi.string().min(2),
  ru_category_name: Joi.string().min(2),
  en_category_name: Joi.string().min(2),
  category_id: Joi.string(),
});
exports.patchCategoriesSchema = Joi.object({
  uz_category_name: Joi.string(),
  ru_category_name: Joi.string(),
  en_category_name: Joi.string(),
  category_id: Joi.string(),
});
