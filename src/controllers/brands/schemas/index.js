const Joi = require("joi");

patchBrandsSchema = Joi.object({
  brand_name: Joi.string().required(),
  uz_country: Joi.string().required(),
  ru_country: Joi.string().required(),
  en_country: Joi.string().required(),
});
postBrandsSchema = Joi.object({
  brand_name: Joi.string(),
  uz_country: Joi.string(),
  ru_country: Joi.string(),
  en_country: Joi.string(),
});

module.exports = {
  patchBrandsSchema,
  postBrandsSchema,
};
