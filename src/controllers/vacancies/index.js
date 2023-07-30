const { default: knex } = require("knex");
const db = require("../../db/index");
// const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getVacancies = async (req, res, next) => {
  try {
    // const a = await db.select().from("vacancies");
    const vacancies = await db("vacancies")
      .leftJoin("images", "images.id", "=", "vacancies.vacancy_img_id")
      .select(
        "vacancies.id",
        //
        "vacancies.first_title_uz",
        "vacancies.first_title_ru",
        "vacancies.first_title_en",
        //
        "vacancies.second_title_uz",
        "vacancies.second_title_ru",
        "vacancies.second_title_en",
        //
        "vacancies.thirt_title_uz",
        "vacancies.thirt_title_ru",
        "vacancies.thirt_title_en",
        //
        "vacancies.first_desc_uz",
        "vacancies.first_desc_ru",
        "vacancies.first_desc_en",
        //
        "vacancies.second_desc_uz",
        "vacancies.second_desc_ru",
        "vacancies.second_desc_en",
        //
        "vacancies.thirt_desc_uz",
        "vacancies.thirt_desc_ru",
        "vacancies.thirt_desc_en",
        "images.image_url"
      )
      .groupBy("vacancies.id", "images.id");

    console.log(vacancies);
    res.json(vacancies);
  } catch (error) {
    console.log("err shu yerdan");
    throw error;
  }
};
const showVacancies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vacancies = await db("vacancies")
      // .leftJoin("images", "images.id", "Vacancies.img_id")
      .select(
        "id",
        //
        "first_title_uz",
        "first_title_ru",
        "first_title_en",
        //
        "second_title_uz",
        "second_title_ru",
        "second_title_en",
        //
        "thirt_title_uz",
        "thirt_title_ru",
        "thirt_title_en",
        ///
        ///
        "first_desc_uz",
        "first_desc_ru",
        "first_desc_en",
        //
        "second_desc_uz",
        "second_desc_ru",
        "second_desc_en",
        //
        "thirt_desc_uz",
        "thirt_desc_ru",
        "thirt_desc_en",

        "vacancy_img_id"
      )
      .where({ "vacancies.id": id })
      // .groupBy("vacancies.id", "images.id")
      .first();
    if (!vacancies) {
      return res.status(404).json({
        error: `${id} - Not Found`,
      });
    }
    if (vacancies.img_id) {
      let id = vacancies.img_id;
      console.log(vacancies.img_id);
      imgUrl = await db("images").where({ id }).select("image_url");
      console.log(imgUrl);
      return res.status(201).json({
        message: "success",
        data: { ...vacancies, ...imgUrl[0] },
      });
    }

    // if (vacancies.img_id) {
    //   let id = vacancies.img_id;
    //   console.log(vacancies.img_id);

    //   const imgurl = await db("vacancies")
    //     .join("images", "vacanciess.img_id", "=", "images.id")
    //     .select("image_url")
    //     .where("vacanciess.id", id);

    //   console.log(imgurl);

    //   return res.status(201).json({
    //     message: "success",
    //     data: { ...vacancies, ...imgurl[0] },
    //   });
    // }

    return res.status(201).json({
      message: "success",
      data: vacancies,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
const patchVacancies = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("vacancies").where({ id }).first();

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
            image_url: `http://localhost:3000/${filename}`,
          })
          .into("images")
          .returning(["id", "image_url", "filename"]);
      }
      const updated = await db("vacancies")
        .where({ id })
        .update({ ...changes, vacancy_img_id: { image }.image[0]?.id })
        .returning([
          "id",
          //
          "first_title_uz",
          "first_title_ru",
          "first_title_en",
          //
          "second_title_uz",
          "second_title_ru",
          "second_title_en",
          //
          "thirt_title_uz",
          "thirt_title_ru",
          "thirt_title_en",
          ///
          ///
          "first_desc_uz",
          "first_desc_ru",
          "first_desc_en",
          //
          "second_desc_uz",
          "second_desc_ru",
          "second_desc_en",
          //
          "thirt_desc_uz",
          "thirt_desc_ru",
          "thirt_desc_en",
          //
        ]);
      res.status(200).json({
        updated: updated[0],
      });
    } else {
      const updated = await db("vacancies")
        .where({ id })
        .update({ ...changes, vacancy_img_id: null })
        .returning([
          "id",
          //
          "first_title_uz",
          "first_title_ru",
          "first_title_en",
          //
          "second_title_uz",
          "second_title_ru",
          "second_title_en",
          //
          "thirt_title_uz",
          "thirt_title_ru",
          "thirt_title_en",
          ///
          ///
          "first_desc_uz",
          "first_desc_ru",
          "first_desc_en",
          //
          "second_desc_uz",
          "second_desc_ru",
          "second_desc_en",
          //
          "thirt_desc_uz",
          "thirt_desc_ru",
          "thirt_desc_en",
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
const postVacancies = async (req, res, next) => {
  try {
    const {
      id,
      first_title_uz,
      first_title_ru,
      first_title_en,

      second_title_uz,
      second_title_ru,
      second_title_en,

      thirt_title_uz,
      thirt_title_ru,
      thirt_title_en,

      first_desc_uz,
      first_desc_ru,
      first_desc_en,

      second_desc_uz,
      second_desc_ru,
      second_desc_en,

      thirt_desc_uz,
      thirt_desc_ru,
      thirt_desc_en,
    } = req.body;
    // console.log(vacancies);
    if (req.file?.filename) {
      //  const { filename } = req.file;
      let filename = req.file?.filename;

      const image = await db("images")
        .insert({
          filename,
          image_url: `http://localhost:3000/${filename}`,
        })
        .returning(["id", "image_url", "filename"]);
      const vacancies = await db("vacancies")
        .insert({
          first_title_uz,
          first_title_ru,
          first_title_en,

          second_title_uz,
          second_title_ru,
          second_title_en,

          thirt_title_uz,
          thirt_title_ru,
          thirt_title_en,

          first_desc_uz,
          first_desc_ru,
          first_desc_en,

          second_desc_uz,
          second_desc_ru,
          second_desc_en,

          thirt_desc_uz,
          thirt_desc_ru,
          thirt_desc_en,
          vacancy_img_id: { image }.image[0].id,
        })
        .returning(["*"]);

      res.status(200).json({
        data: [...vacancies, image[0]],
      });
    } else {
      const vacancies = await db("vacancies")
        .insert({
          first_title_uz,
          first_title_ru,
          first_title_en,

          second_title_uz,
          second_title_ru,
          second_title_en,

          thirt_title_uz,
          thirt_title_ru,
          thirt_title_en,

          first_desc_uz,
          first_desc_ru,
          first_desc_en,

          second_desc_uz,
          second_desc_ru,
          second_desc_en,

          thirt_desc_uz,
          thirt_desc_ru,
          thirt_desc_en,
          //   vacancy_img_id: { image }.image[0].id,
          vacancy_img_id: null,
        })
        .returning(["*"]);

      res.status(200).json({
        data: [...vacancies],
      });
    }
  } catch (error) {
    console.log(error);
    // throw new NotFoundErr("something went wrong");
    res.send(error);
  }
};
const deleteVacancies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("vacancies").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} - Not found`,
      });
    }

    const del = await db("vacancies").where({ id }).returning(["*"]).del();

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
  getVacancies,
  postVacancies,
  showVacancies,
  patchVacancies,
  deleteVacancies,
};
