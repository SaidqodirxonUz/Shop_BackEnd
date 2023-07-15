/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("brands", (table) => {
      table.increments("id").primary();
      table.string("brand_name").notNullable().unique();
      table.string("uz_country").notNullable();
      table.string("ru_country").notNullable();
      table.string("en_country").notNullable();
      table
        .integer("img_id")
        .references("id")
        .inTable("images")
        .onDelete("SET NULL");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("brands");
  };
  