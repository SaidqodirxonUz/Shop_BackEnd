/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product_images", (table) => {
    table.increments("id").primary();
    // product id foreign key reference to products table
    table
      .integer("productId")
      .references("id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("RESTRICT")
      .notNullable();
    table
      .integer("img_id")
      .references("id")
      .inTable("images")
      .onDelete("CASCADE")
      .onUpdate("RESTRICT")
      .notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
