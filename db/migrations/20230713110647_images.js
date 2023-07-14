/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable("images", (table) => {
    table.increments("id").primary();
    // image_url, user_id, created_at
    table.string("filename").notNullable().unique();
    table.string("image_url").notNullable().unique();
    // table.integer('user_id')
    table
      .timestamp("created_at", { useTz: false })
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("images");
};
