/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("uz_category_name", 150).notNullable();
    table.string("ru_category_name", 150).notNullable();
    table.string("en_category_name", 150).notNullable();
    table.integer("img_id").references("id").inTable("images").unique();
    table
      .integer("category_id")
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("categories");
};
