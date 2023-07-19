const { default: knex } = require("knex");
const db = require("../../db/index");
// const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getOrder = async (req, res, next) => {
  try {
    // const a = db.select().from("orders");
    // console.log(a);
    const Order = await db("orders").select("*");
    // .leftJoin("images", "images.id", "Order.img_id")
    // .groupBy("Order.id", "images.id");
    return res.status(201).json({
      message: "success",
      data: { ...Order },
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
const showOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await db("orders")
      .select("*")
      .where({ "orders.id": id })
      .first();
    if (!order) {
      return res.status(400).json({
        error: `${id} - idli order yo'q`,
      });
    }
    // if (order.img_id) {
    //   let id = order.img_id;
    //   console.log(order.img_id);
    //   imgUrl = await db("images").where({ id }).select("image_url");
    //   console.log(imgUrl);
    //   return res.status(201).json({
    //     message: "success",
    //     data: { ...order, ...imgUrl[0] },
    //   });
    // }

    // if (order.img_id) {
    //   let id = order.img_id;
    //   console.log(order.img_id);

    //   const imgurl = await db("orders")
    //     .join("images", "Order.img_id", "=", "images.id")
    //     .select("image_url")
    //     .where("Order.id", id);

    //   console.log(imgurl);

    //   return res.status(201).json({
    //     message: "success",
    //     data: { ...order, ...imgurl[0] },
    //   });
    // }

    return res.status(201).json({
      message: "success",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
const patchOrder = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("orders").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli order yo'q`,
      });
    }

    const updated = await db("orders")
      .where({ id })
      .update({ ...changes })
      .returning(["*"]);
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
const postOrder = async (req, res, next) => {
  try {
    const data = req.body;
    // console.log(order_name);
    // if (req.file?.filename) {
    // const { filename } = req.file;
    // let filename = req.file?.filename;

    // const image = await db("images")
    //   .insert({
    //     filename,
    //     image_url: `http://localhost:3000/public/${filename}`,
    //   })
    //   .returning(["id", "image_url", "filename"]);
    const order = await db("orders")
      .insert({
        ...data,
        totalAmount: 12345,
        products_id: { products: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      })
      .returning(["*"]);

    res.status(200).json({
      data: { ...order },
    });
    // } else {
    // const order = await db("orders")
    //   .insert({
    //     order_name: order_name,
    //     uz_country,
    //     ru_country,
    //     en_country,
    //     img_id: null,
    //   })
    //   .returning(["*"]);

    // res.status(200).json({
    //   data: [...order],
    // });
    // }
  } catch (error) {
    console.log(error);
    // throw new NotFoundErr("something went wrong");
    res.send(error);
  }
};
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("orders").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli order yo'q`,
      });
    }

    const del = await db("orders").where({ id }).returning(["*"]).del();

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
  getOrder,
  postOrder,
  showOrder,
  patchOrder,
  deleteOrder,
};
