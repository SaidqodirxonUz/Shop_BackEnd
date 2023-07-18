const Joi = require("joi");

patchVacanciesSchema = Joi.object({
  first_title_uz: Joi.string(),
  first_title_ru: Joi.string(),
  first_title_en: Joi.string(),
  //
  second_title_uz: Joi.string(),
  second_title_ru: Joi.string(),
  second_title_en: Joi.string(),
  //
  thirt_title_uz: Joi.string(),
  thirt_title_ru: Joi.string(),
  thirt_title_en: Joi.string(),
  //
  //
  first_desc_uz: Joi.string(),
  first_desc_ru: Joi.string(),
  first_desc_en: Joi.string(),
  //
  second_desc_uz: Joi.string(),
  second_desc_ru: Joi.string(),
  second_desc_en: Joi.string(),
  //
  thirt_desc_uz: Joi.string(),
  thirt_desc_ru: Joi.string(),
  thirt_desc_en: Joi.string(),
});

postVacanciesSchema = Joi.object({
  first_title_uz: Joi.string(),
  first_title_ru: Joi.string().required(),
  first_title_en: Joi.string().required(),
  //
  second_title_uz: Joi.string(),
  second_title_ru: Joi.string(),
  second_title_en: Joi.string(),
  //
  thirt_title_uz: Joi.string(),
  thirt_title_ru: Joi.string(),
  thirt_title_en: Joi.string(),
  //
  //
  first_desc_uz: Joi.string().required(),
  first_desc_ru: Joi.string().required(),
  first_desc_en: Joi.string().required(),
  //0
  second_desc_uz: Joi.string(),
  second_desc_ru: Joi.string(),
  second_desc_en: Joi.string(),
  //
  thirt_desc_uz: Joi.string(),
  thirt_desc_ru: Joi.string(),
  thirt_desc_en: Joi.string(),
});

getVacanciesSchema = Joi.object({
  first_title_uz: Joi.string(),
  first_title_ru: Joi.string(),
  first_title_en: Joi.string(),
  //
  second_title_uz: Joi.string(),
  second_title_ru: Joi.string(),
  second_title_en: Joi.string(),
  //
  thirt_title_uz: Joi.string(),
  thirt_title_ru: Joi.string(),
  thirt_title_en: Joi.string(),
  //
  //
  first_desc_uz: Joi.string(),
  first_desc_ru: Joi.string(),
  first_desc_en: Joi.string(),
  //
  second_desc_uz: Joi.string(),
  second_desc_ru: Joi.string(),
  second_desc_en: Joi.string(),
  //
  thirt_desc_uz: Joi.string(),
  thirt_desc_ru: Joi.string(),
  thirt_desc_en: Joi.string(),
});
module.exports = {
  patchVacanciesSchema,
  postVacanciesSchema,
  getVacanciesSchema,
};
