const { default: knex } = require("knex");
const { db } = require("../../db");
// const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getBrands = async (req, res, next) => {
  try {
    const brands = await db("brands")
      .leftJoin("pictures", "pictures.id", "brands.image_id")
      .select(
        "brands.id",
        "brands.brand_name",
        "brands.uz_country",
        "brands.ru_country",
        "brands.en_country",
        "pictures.img_url"
      )
      .groupBy("brands.id", "pictures.id");
    return res.status(201).json({
      message: "success",
      data: { ...brands },
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato 
      ${error}`,
    });
  }
};
const showBrands = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await db("brands")
      .leftJoin("pictures", "pictures.id", "brands.image_id")
      .select(
        "brands.id",
        "brands.brand_name",
        "brands.uz_country",
        "brands.ru_country",
        "brands.en_country",
        "pictures.img_url"
      )
      .where({ "brands.id": id })
      .groupBy("brands.id", "pictures.id")
      .first();
    if (!brand) {
      res.status(400).json({
        error: `${id} - idli brand yo'q`,
      });
    }
    return res.status(201).json({
      message: "success",
      data: brand,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
const patchBrands = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("brands").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli brand yo'q`,
      });
    }

    const image = await db
      .insert({
        filename,
        img_url: `http://localhost:7070/public/${filename}`,
      })
      .into("pictures")
      .returning(["id", "img_url"]);
    const updated = await db("brands")
      .where({ id })
      .update({ ...changes, image_id: { image }.image[0].id })
      .returning([
        "id",
        "brand_name",
        "brands.uz_country",
        "brands.ru_country",
        "brands.en_country",
      ]);

    res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
const postBrands = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const {
      brand_name,
      brands_uz_country,
      brands_ru_country,
      brands_en_country,
    } = req.body;
    console.log(brand_name);
    console.log(filename);
    const image = await db("images")
      .insert({
        filename,
        img_url: `http://localhost:7070/public/${filename}`,
      })
      .returning(["id", "img_url"]);
    const brand = await db("brands")
      .insert({
        brand_name: brand_name,
        uz_country: brands_uz_country,
        ru_country: brands_ru_country,
        en_country: brands_en_country,
        image_id: { image }.image[0].id,
      })
      .returning(["*"]);

    res.status(200).json({
      data: [brand[0], image],
    });
  } catch (error) {
    console.log(error);
    // throw new NotFoundErr("something went wrong");
    res.send(error);
  }
};
const deleteBrands = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("brands").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli brand yo'q`,
      });
    }

    const del = await db("brands").where({ id }).returning(["*"]).del();

    res.status(200).json({
      deleted: del,
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};
module.exports = {
  getBrands,
  postBrands,
  showBrands,
  patchBrands,
  deleteBrands,
};
