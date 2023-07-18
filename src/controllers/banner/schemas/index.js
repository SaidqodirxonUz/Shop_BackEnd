const Joi = require("joi");

patchBannerSchema = Joi.object({
  title_uz: Joi.string(),
  title_ru: Joi.string(),
  title_en: Joi.string(),
  //
  //
  desc_uz: Joi.string(),
  desc_ru: Joi.string(),
  desc_en: Joi.string(),
});

postBannerSchema = Joi.object({
  title_uz: Joi.string(),
  title_ru: Joi.string().required(),
  title_en: Joi.string().required(),
  //
  //
  desc_uz: Joi.string().required(),
  desc_ru: Joi.string().required(),
  desc_en: Joi.string().required(),
  //0
});

getBannerSchema = Joi.object({
  title_uz: Joi.string(),
  title_ru: Joi.string(),
  title_en: Joi.string(),
  //
  //
  desc_uz: Joi.string(),
  desc_ru: Joi.string(),
  desc_en: Joi.string(),
});
module.exports = {
  patchBannerSchema,
  postBannerSchema,
  getBannerSchema,
};
