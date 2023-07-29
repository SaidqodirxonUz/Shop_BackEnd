const { default: knex } = require("knex");
const db = require("../../db");
// const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getProducts = async (req, res, next) => {
  // console.log(db("Products"));
  try {
    const Products = await db("products").select("*");
    // .leftJoin("product_images", "product_images.productId", "products.id")
    // .leftJoin("images", "images.id", "product_images.img_id")
    // .groupBy("products.id", "images.id", "product_images.id");
    // "products.id",
    // "products.uz_product_name",
    // "products.ru_product_name",
    // "products.en_product_name",
    // "products.uz_description",
    // "products.ru_description",
    // "products.en_description",
    // "products.category_id",
    // "products.brand_id",
    // "products.user_id",
    // "products.uz_status",
    // "products.ru_status",
    // "products.en_status",
    // "products.color",
    // "products.quantity",
    // "products.valyuta",
    // "products.aksiyafoizi",
    // "images.image_url"
    return res.status(200).json({
      message: "success",
      data: Products,
    });
  } catch (error) {
    console.log(error);
    // throw new BadRequestErr("Xatolik yuz berdi", error);
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato ${error}`,
    });
  }
};
const showProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await db("products").where({ id }).select("*").first();
    // "id",
    // "uz_product_name",
    // "ru_product_name",
    // "en_product_name",
    // "uz_description",
    // "ru_description",
    // "en_description",
    // "category_id",
    // "brand_id",
    // "user_id",
    // "uz_status",
    // "ru_status",
    // "en_status",
    // "color",
    // "quantity",
    // "valyuta",
    // "aksiyafoizi",
    // "images"
    if (!product) {
      return res.status(400).json({
        error: `${id} - idli product yo'q`,
      });
    }
    // console.log(product);
    // if (product) {
    // let productId = product.id;
    // console.log(product.id);
    // let img_id = await db("product_images")
    //   .where({ productId })
    //   .select("img_id")
    //   .first();
    // console.log(img_id, "this is imgid");
    // if (!img_id) {
    //   return res.status(201).json({
    //     message: "success",
    //     data: { ...product },
    //   });
    // }
    // imgUrl = await db("images").where({ img_id }).select("image_url");

    return res.status(201).json({
      message: "success",
      data: { ...product },
    });
    // }
    // return res.status(201).json({
    //   message: "success",
    //   data: { ...product },
    // });
  } catch (error) {
    // throw new BadRequestErr("Xatolik yuz berdi", error);
    next(error);
  }
};
const patchProducts = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const reqfile = req?.files;
    console.log(reqfile, "request files");
    const existing = await db("products").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli product yo'q`,
      });
    }
    // if (req.file?.filename) {
    if (req.files) {
      const files = req.files.map((file) => ({
        filename: file.filename,
        image_url: `https://api.victoriaslove.uz/public/${file.filename}`,
      }));
      console.log("mapped images", files);
      // insert(images);
      let images = await db("images")
        .insert(files)
        .returning(["id", "image_url", "filename"]);

      const updated = await db("products")
        .where({ id })
        .update({ ...changes, images: { ...images } })
        .returning(["*"]);

      return res.status(200).json({
        updated: [updated[0]],
      });
    } else {
      const updated = await db("products")
        .where({ id })
        .update({ ...changes })
        .returning(["*"]);

      res.status(200).json({
        updated: updated[0],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: `Xatolik! ${error}`,
    });
    // throw new NotFoundErr("Nothing founded!");
  }
};
const postProducts = async (req, res, next) => {
  try {
    const data = req.body;
    const files = req?.files;
    // const products = await db("products")
    //   .insert({
    //     ...data,
    //   })
    //   .returning(["*"]);
    if (req.files) {
      const images = req.files.map((file) => ({
        filename: file.filename,
        image_url: `https://api.victoriaslove.uz/public/${file.filename}`,
      }));
      console.log("mapped images", images);
      // insert(images);
      let image = await db("images")
        .insert(images)
        .returning(["id", "image_url", "filename"]);
      // console.log(image, "inserted images");

      // urls = ["a", "v"];
      const products = await db("products")
        .insert({
          ...data,
          images: { ...image },
        })
        .returning(["*"]);
      return res.status(200).json({
        data: products[0],
      });
    }

    // if (req.files) {
    //   let productImageRecord = null;
    //   console.log(files);
    //   let image = null;
    //   let product = null;
    //   //   for (const file of files) {
    //   const images = [];
    //   for (let i = 0; i < files.length; i++) {
    //     const element = files[i];
    //     console.log(element, "bu file loopdan");
    //     let filename = files[i].filename;
    //     image = await db("images")
    //       .insert({
    //         filename,
    //         image_url: `https://api.victoriaslove.uz/public/${filename}`,
    //       })
    //       .returning(["id", "image_url", "filename"]);
    //     console.log(image);
    //     productImageRecord = await db("product_images")
    //       .insert({
    //         productId: products[0].id,
    //         img_id: image[0].id,
    //       })
    //       .returning("*");
    //     console.log(element);
    //     let img = await db("images")
    //       .select("image_url")
    //       .where({ id: productImageRecord[i].img_id })
    //       .first();
    //     images.push(img);
    //   .first();
    // console.log(productImageRecord);
    //   }
    //   console.log(productImageRecord, "..");
    //   for (let i = 0; i < productImageRecord.length; i++) {
    // const element = productImageRecord[i];

    // console.log(element);
    // let img = await db("images")
    //   .select("image_url")
    //   .where({ id: productImageRecord[i].img_id })
    //   .first();
    // images.push(img);
    //   }
    //   console.log(images);
    //   console.log(images, "images");
    //   return res.status(200).json({
    //     data: { ...products[0], ...images[0] },
    //   });
    // } else {
    // }
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: `Xatolik! ${error}`,
    });
  }
};
const deleteProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("products").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli product yo'q`,
      });
    }

    const del = await db("products").where({ id }).returning(["*"]).del();

    res.status(200).json({
      deleted: del,
    });
  } catch (error) {
    console.log(error);
    // throw new BadRequestErr("Something went wrong!", error);

    res.status(400).json({
      message: `Xatolik! ${error}`,
    });
  }
};
module.exports = {
  getProducts,
  postProducts,
  showProducts,
  patchProducts,
  deleteProducts,
};
