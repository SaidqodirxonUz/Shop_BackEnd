const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, hasRole } = require("../shared/auth");
const {
  postVacanciesSchema,
  patchVacanciesSchema,
  getVacanciesSchema,
} = require("../controllers/vacancies/schemas/index");
const vacanciesController = require("../controllers/vacancies");
const upload = require("../uploads");

const router = express.Router();

const sPostVacancies = [
  upload.single("image"),
  isLoggedIn,
  hasRole(["super_admin"]),
  genValidator(postVacanciesSchema),
];
// const sGetVacancies = [isLoggedIn];
// const mShowVacancies = [isLoggedIn];

const sGetVacancies = [
  isLoggedIn,
  hasRole(["super_admin"]),
  genValidator(getVacanciesSchema),
];

const sPacthVacancies = [
  upload.single("image"),
  isLoggedIn,
  hasRole(["super_admin"]),
  genValidator(patchVacanciesSchema),
];

const mDeleteVacancies = [isLoggedIn, hasRole(["super_admin"])];

router.post("/vacancies", sPostVacancies, vacanciesController.postVacancies);

router.get("/vacancies", vacanciesController.getVacancies);

router.get("/vacancies/:id", sGetVacancies, vacanciesController.showVacancies);

router.patch(
  "/vacancies/:id",
  sPacthVacancies,
  vacanciesController.patchVacancies
);

router.delete(
  "/vacancies/:id",
  mDeleteVacancies,
  vacanciesController.deleteVacancies
);
module.exports = router;
