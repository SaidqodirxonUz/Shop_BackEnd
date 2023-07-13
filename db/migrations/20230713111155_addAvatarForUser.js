/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.alterTable("users", (table) => {
    table
      .string("avatar_id", 350)
      .references("id")
      .inTable("images")
      .onDelete("SET NULL");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
