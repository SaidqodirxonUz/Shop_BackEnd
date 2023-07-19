const Joi = require("joi");

postOrderSchema = Joi.object({
  address: Joi.string(),
  phone: Joi.number(),
  // totalAmount: Joi.number().integer().required(),
  valyuta: Joi.string().valid("uzs", "rub", "usd").default("uzs"),
  ru_status: Joi.string().valid(
    "заказ обработан",
    "заказ отменён",
    "заказ оплачен",
    "заказ не оплачен",
    "товар дозтавлен",
    "товар не доставлен"
  ),
  en_status: Joi.string().valid(
    "order processed",
    "order cancelled",
    "order has been paid",
    "order not paid",
    "order delivered",
    "order not delivered"
  ),
  uz_status: Joi.string().valid(
    "buyurtma qayta ishlandi",
    "buyurtma bekor qilindi",
    "buyurtma to`langan",
    "buyurtma to`lanmagan",
    "buyurtma yetkazib berildi",
    "buyurtma yetkazib berilmadi"
  ),
  user_id: Joi.number().integer().required(),
  client_id: Joi.number().integer().required(),
  products_id: Joi.array()

});
patchOrderSchema = Joi.object({
  address: Joi.string(),
  phone: Joi.number(),
  // totalAmount: Joi.number().integer(),
  valyuta: Joi.string().valid("uzs", "rub", "usd").default("uzs"),
  ru_status: Joi.string().valid(
    "заказ обработан",
    "заказ отменён",
    "заказ оплачен",
    "заказ не оплачен",
    "товар дозтавлен",
    "товар не доставлен"
  ),
  en_status: Joi.string().valid(
    "order processed",
    "order cancelled",
    "order has been paid",
    "order not paid",
    "order delivered",
    "order not delivered"
  ),
  uz_status: Joi.string().valid(
    "buyurtma qayta ishlandi",
    "buyurtma bekor qilindi",
    "buyurtma to`langan",
    "buyurtma to`lanmagan",
    "buyurtma yetkazib berildi",
    "buyurtma yetkazib berilmadi"
  ),
  user_id: Joi.number().integer(),
  client_id: Joi.number().integer(),
});

module.exports = {
  patchOrderSchema,
  postOrderSchema,
};
