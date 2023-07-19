const Joi = require("joi");

exports.postProductsSchema = Joi.object({
  uz_product_name: Joi.string().min(2),
  ru_product_name: Joi.string().min(2),
  en_product_name: Joi.string().min(2),
  uz_description: Joi.string().min(2),
  ru_description: Joi.string().min(2),
  en_description: Joi.string().min(2),
  color: Joi.string(),
  aksiyafoizi: Joi.number().integer(),
  price: Joi.number().required(),
  quantity: Joi.number().integer(),
  uz_status: Joi.string().valid("sotuvda bor", "sotuvda emas").required(),
  ru_status: Joi.string().valid("в наличии", "нет в наличии").required(),
  en_status: Joi.string().valid("in stock", "not available").required(),
  valyuta: Joi.string().valid("uzs", "rub", "usd").required(),
  brand_name: Joi.string().required(),
  category_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
});
exports.patchProductsSchema = Joi.object({
  uz_product_name: Joi.string(),
  ru_product_name: Joi.string(),
  en_product_name: Joi.string(),
  uz_description: Joi.string(),
  ru_description: Joi.string(),
  en_description: Joi.string(),
  color: Joi.string(),
  price: Joi.number(),
  aksiyafoizi: Joi.number().integer(),
  quantity: Joi.number().integer(),
  uz_status: Joi.string().valid("sotuvda bor", "sotuvda emas"),
  ru_status: Joi.string().valid("в наличии", "нет в наличии"),
  en_status: Joi.string().valid("in stock", "not available"),
  valyuta: Joi.string().valid("uzs", "rub", "usd"),
  brand_name: Joi.string(),
  category_id: Joi.number().integer(),
  user_id: Joi.number().integer(),
});
