/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    // product name, description and price are required fields for a new product to be created
    table.string("uz_product_name", 250).notNullable().unique();
    table.string("ru_product_name", 250).notNullable().unique();
    table.string("en_product_name", 250).notNullable().unique();
    table.text("uz_description").notNullable();
    table.text("ru_description").notNullable();
    table.text("en_description").notNullable();
    table.decimal("price").notNullable();
    table.string("color", 100);
    table.integer("aksiyafoizi").defaultTo(0);
    table.string("size", 250);
    table.integer("quantity").defaultTo(0);
    table.enum("uz_status", ["sotuvda bor", "sotuvda emas"]).notNullable();
    table.enum("ru_status", ["в наличии", "нет в наличии"]).notNullable();
    table.enum("en_status", ["in stock", "not available"]).notNullable();
    table.enum("valyuta", ["uzs", "rub", "usd"]).notNullable();
    table.enum("is_public", [true, false]).defaultTo(false),
      table
        .integer("category_id")
        .unsigned()
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE")
        .onUpdate("RESTRICT");
    // table
    //   .integer("brand_id")
    //   .unsigned()
    //   .references("id")
    //   .inTable("brands")
    //   .onDelete("CASCADE")
    //   .onUpdate("RESTRICT");
    // table
    //   .integer("img_id")
    //   .references("id")
    //   .inTable("images")
    //   .onDelete("CASCADE")
    // .onUpdate("RESTRICT");
    // table
    //   .string("img_url")
    //   .references("image_url")
    //   .inTable("images")
    //   .onDelete("CASCADE")
    //   .onUpdate("RESTRICT");
    table.boolean("is_available").defaultTo(true);
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("RESTRICT");
    table
      .string("brand_name")
      .unsigned()
      .references("brand_name")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("RESTRICT");
    table.timestamps(true, true);
    table.json("images");

    // table.timestamp("created_at").defaultTo(knex.fn.now());
    /*
    The foreign key constraint ensures that the category id exists in categories
    before inserting into products with it as reference
    Also on delete cascade will ensure if any related record is deleted from
    categories then all its references would also get removed automatically
    And finally onUpdate restrict means no update can happen unless explicitly allowed
    by setting allowNull: false
    */
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
