/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("full_name").notNullable();
    table.string("phone_number").notNullable().unique();
    table.string("email").unique();
    table.string("password", 350);
    table.string("adress", 300);
    table.string("avatar_id", 350);
    table.timestamp("data_time").defaultTo(knex.fn.now()).notNullable();
    table.enum("role", ["admin", "super_admin", "user"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
