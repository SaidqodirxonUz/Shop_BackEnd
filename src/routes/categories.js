const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, isAdmin, hasRole } = require("../shared/auth");
const {
  postCategoriesSchema,
  patchCategoriesSchema,
} = require("../controllers/categories/schemas");
const CategoriesController = require("../controllers/categories");
const upload = require("../uploads");

const router = express.Router();

const mPostCategories = [
  isLoggedIn,
  hasRole(["super_admin"]),
  genValidator(postCategoriesSchema),
  upload.single("image"),
];
const mPatchCategories = [
  isLoggedIn,
  hasRole(["super_admin"]),
  genValidator(patchCategoriesSchema),
  upload.single("image"),
];
const mDeleteCategories = [isLoggedIn, hasRole(["super_admin"])];

router.post(
  "/products/categories",
  mPostCategories,
  CategoriesController.postCategories
);
router.get("/products/categories", CategoriesController.getCategories);
router.get("/products/categories/:id", CategoriesController.showCategories);
router.patch(
  "/products/categories/:id",
  mPatchCategories,
  CategoriesController.patchCategories
);
router.delete(
  "/products/categories/:id",
  mDeleteCategories,
  CategoriesController.deleteCategories
);
module.exports = router;
