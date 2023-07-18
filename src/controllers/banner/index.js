const { default: knex } = require("knex");
const db = require("../../db/index");
// const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getBanner = async (req, res, next) => {
  try {
    const a = await db.select().from("banner");
    const banner = await db("banner")
      .leftJoin("images", "images.id", "banner.banner_img_id")
      .select(
        "banner.id",
        //
        "banner.title_uz",
        "banner.title_ru",
        "banner.title_en",
        //
        //
        "banner.desc_uz",
        "banner.desc_ru",
        "banner.desc_en",
        //
        "images.image_url"
      )
      .groupBy("banner.id", "images.id");

    console.log(banner);
    res.json(banner);
  } catch (error) {
    console.log("err shu yerdan");
    throw error;
  }
};
const showBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const banner = await db("banner")
      // .leftJoin("images", "images.id", "banner.img_id")
      .select(
        "id",
        //
        "title_uz",
        "title_ru",
        "title_en",
        //
        //
        "desc_uz",
        "desc_ru",
        "desc_en",

        "banner_img_id"
      )
      .where({ "banner.id": id })
      // .groupBy("banner.id", "images.id")
      .first();
    if (!banner) {
      return res.status(404).json({
        error: `${id} - Not Found`,
      });
    }
    if (banner.img_id) {
      let id = banner.img_id;
      console.log(banner.img_id);
      imgUrl = await db("images").where({ id }).select("image_url");
      console.log(imgUrl);
      return res.status(201).json({
        message: "success",
        data: { ...banner, ...imgUrl[0] },
      });
    }

    // if (banner.img_id) {
    //   let id = banner.img_id;
    //   console.log(banner.img_id);

    //   const imgurl = await db("banner")
    //     .join("images", "banners.img_id", "=", "images.id")
    //     .select("image_url")
    //     .where("banners.id", id);

    //   console.log(imgurl);

    //   return res.status(201).json({
    //     message: "success",
    //     data: { ...banner, ...imgurl[0] },
    //   });
    // }

    return res.status(201).json({
      message: "success",
      data: banner,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
const patchBanner = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("banner").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} - Not found`,
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
      const updated = await db("banner")
        .where({ id })
        .update({ ...changes, banner_img_id: { image }.image[0]?.id })
        .returning([
          "id",
          //
          "title_uz",
          "title_ru",
          "title_en",
          //
          //
          "desc_uz",
          "desc_ru",
          "desc_en",
          //
        ]);
      res.status(200).json({
        updated: updated[0],
      });
    } else {
      const updated = await db("banner")
        .where({ id })
        .update({ ...changes, banner_img_id: null })
        .returning([
          "id",
          //
          "title_uz",
          "title_ru",
          "title_en",
          //
          //
          "desc_uz",
          "desc_ru",
          "desc_en",
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
const postBanner = async (req, res, next) => {
  try {
    const {
      id,
      title_uz,
      title_ru,
      title_en,

      desc_uz,
      desc_ru,
      desc_en,
    } = req.body;
    // console.log(banner);
    if (req.file?.filename) {
      //  const { filename } = req.file;
      let filename = req.file?.filename;

      const image = await db("images")
        .insert({
          filename,
          image_url: `http://localhost:3000/public/${filename}`,
        })
        .returning(["id", "image_url", "filename"]);
      const banner = await db("banner")
        .insert({
          title_uz,
          title_ru,
          title_en,

          desc_uz,
          desc_ru,
          desc_en,

          banner_img_id: { image }.image[0].id,
        })
        .returning(["*"]);

      res.status(200).json({
        data: [...banner, image[0]],
      });
    } else {
      const banner = await db("banner")
        .insert({
          title_uz,
          title_ru,
          title_en,

          desc_uz,
          desc_ru,
          desc_en,
          //   banner_img_id: { image }.image[0].id,
          banner_img_id: null,
        })
        .returning(["*"]);

      res.status(200).json({
        data: [...banner],
      });
    }
  } catch (error) {
    console.log(error);
    // throw new NotFoundErr("something went wrong");
    res.send(error);
  }
};
const deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("banner").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} - Not found`,
      });
    }

    const del = await db("banner").where({ id }).returning(["*"]).del();

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
  getBanner,
  postBanner,
  showBanner,
  patchBanner,
  deleteBanner,
};
