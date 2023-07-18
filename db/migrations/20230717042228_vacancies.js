/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("vacancies", (table) => {
    table.increments("id").primary();
    table.string("first_title_uz", 300).notNullable();
    table.string("first_title_ru", 300).notNullable();
    table.string("first_title_en", 300).notNullable();
    //
    table.string("second_title_uz", 300).notNullable();
    table.string("second_title_ru", 300).notNullable();
    table.string("second_title_en", 300).notNullable();
    //
    table.string("thirt_title_uz", 300).notNullable();
    table.string("thirt_title_ru", 300).notNullable();
    table.string("thirt_title_en", 300).notNullable();
    //
    //
    table.text("first_desc_uz").notNullable();
    table.text("first_desc_ru").notNullable();
    table.text("first_desc_en").notNullable();
    //
    table.text("second_desc_uz").notNullable();
    table.text("second_desc_ru").notNullable();
    table.text("second_desc_en").notNullable();
    //
    table.text("thirt_desc_uz").notNullable();
    table.text("thirt_desc_ru").notNullable();
    table.text("thirt_desc_en").notNullable();

    table
      .integer("vacancy_img_id")
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
  return knex.schema.dropTable("vacancies");
};
