/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    // customer_name, address and phone are optional fields for orders that don't have a registered
    // user associated with them yet
    table.text("address");
    table.bigInteger("phone");
    table.decimal("totalAmount").unsigned().notNullable();
    table.enum("valyuta", ["uzs", "rub", "usd"]).defaultTo("uzs");
    table
      .enum("ru_status", [
        "заказ обработан",
        "заказ отменён",
        "заказ оплачен",
        "заказ не оплачен",
        "товар дозтавлен",
        "товар не доставлен",
      ])
      .defaultTo("заказ обработан");

    table
      .enum("en_status", [
        "order processed",
        "order cancelled",
        "order has been paid",
        "order not paid",
        "order delivered",
        "order not delivered",
      ])
      .defaultTo("order not paid");

    table
      .enum("uz_status", [
        "buyurtma qayta ishlandi",
        "buyurtma bekor qilindi",
        "buyurtma to`langan",
        "buyurtma to`lanmagan",
        "buyurtma yetkazib berildi",
        "buyurtma yetkazib berilmadi",
      ])
      .defaultTo("buyurtma to`lanmagan");
    // table.boolean("isPaid").notNullable().defaultTo(false);
    table.json("products_id").notNullable();
    table
      .integer("user_id")
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("client_id")
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
    // table.string("customer_name", 50).nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("orders");
};
