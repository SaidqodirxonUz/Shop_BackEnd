const { default: knex } = require("knex");
const db = require("../../db/index");
// const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getBrands = async (req, res, next) => {
  try {
    const a = db.select().from("brands");
    console.log(a);
    const brands = await db("brands")
      .leftJoin("images", "images.id", "brands.img_id")
      .select(
        "brands.id",
        "brands.brand_name",
        "brands.uz_country",
        "brands.ru_country",
        "brands.en_country",
        "images.image_url"
      )
      .groupBy("brands.id", "images.id");
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
      // .leftJoin("images", "images.id", "brands.img_id")
      .select(
        "id",
        "brand_name",
        "uz_country",
        "ru_country",
        "en_country",
        "img_id"
      )
      .where({ "brands.id": id })
      // .groupBy("brands.id", "images.id")
      .first();
    if (!brand) {
      return res.status(400).json({
        error: `${id} - idli brand yo'q`,
      });
    }
    if (brand.img_id) {
      let id = brand.img_id;
      console.log(brand.img_id);
      imgUrl = await db("images").where({ id }).select("image_url");
      console.log(imgUrl);
      return res.status(201).json({
        message: "success",
        data: { ...brand, ...imgUrl[0] },
      });
    }

    // if (brand.img_id) {
    //   let id = brand.img_id;
    //   console.log(brand.img_id);

    //   const imgurl = await db("brands")
    //     .join("images", "brands.img_id", "=", "images.id")
    //     .select("image_url")
    //     .where("brands.id", id);

    //   console.log(imgurl);

    //   return res.status(201).json({
    //     message: "success",
    //     data: { ...brand, ...imgurl[0] },
    //   });
    // }

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
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("brands").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli brand yo'q`,
      });
    }
    if (req.file?.filename) {
      let image = null;
      let filename = req.file?.filename;
      if (filename) {
        image = await db
          .insert({
            filename,
            image_url: `http://localhost:3000/public/${filename}`,
          })
          .into("images")
          .returning(["id", "image_url", "filename"]);
      }
      const updated = await db("brands")
        .where({ id })
        .update({ ...changes, img_id: { image }.image[0]?.id })
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
    } else {
      const updated = await db("brands")
        .where({ id })
        .update({ ...changes, img_id: null })
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
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
const postBrands = async (req, res, next) => {
  try {
    const { brand_name, uz_country, ru_country, en_country } = req.body;
    console.log(brand_name);
    if (req.file?.filename) {
      // const { filename } = req.file;
      let filename = req.file?.filename;

      const image = await db("images")
        .insert({
          filename,
          image_url: `http://localhost:3000/public/${filename}`,
        })
        .returning(["id", "image_url", "filename"]);
      const brand = await db("brands")
        .insert({
          brand_name: brand_name,
          uz_country,
          ru_country,
          en_country,
          img_id: { image }.image[0].id,
        })
        .returning(["*"]);

      res.status(200).json({
        data: [...brand, image[0]],
      });
    } else {
      const brand = await db("brands")
        .insert({
          brand_name: brand_name,
          uz_country,
          ru_country,
          en_country,
          img_id: null,
        })
        .returning(["*"]);

      res.status(200).json({
        data: [...brand],
      });
    }
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
