const { hashSync } = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      // id: 1,
      full_name: "Saidqodirxon",
      phone_number: "+998904024707",
      email: "rsaidqodirxon@gmail.com",
      password: hashSync("realcoderuz", 10),
      brand_name: "realcoderuz",
      brand_uz_country: "o'zbekistan",
      brand_ru_country: "uzbekstan",
      brand_en_country: "uzbekistan",
      adress: "Sirdaryo",
      role: "super_admin",
    },
    {
      // id: 1,
      full_name: "Muhammadjon Abduvahobov",
      phone_number: "+998916223406",
      email: "muhammadjonabduvahobov7701@gmail.com",
      password: hashSync("megacoderuz", 10),
      brand_name: "megacoderuz",
      brand_uz_country: "o'zbekistan",
      brand_ru_country: "uzbekstan",
      brand_en_country: "uzbekistan",
      adress: "Sirdaryo",
      role: "admin",
    },
  ]);
};
