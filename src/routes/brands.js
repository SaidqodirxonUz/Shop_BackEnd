const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, hasRole } = require("../shared/auth");
const {
  postBrandsSchema,
  patchBrandsSchema,
} = require("../controllers/brands/shemas/index");
const brandsController = require("../controllers/brands");
const upload = require("../uploads");

const router = express.Router();

const mPostBrand = [
  upload.single("image"),
  isLoggedIn,
  hasRole(["super_admin"]),
  genValidator(postBrandsSchema),
];
// const mGetBrands = [isLoggedIn];
// const mShowBrands = [isLoggedIn];
const mPatchBrand = [
  upload.single("image"),
  isLoggedIn,
  hasRole(["super_admin"]),
  genValidator(patchBrandsSchema),
];
const mDeleteBrand = [isLoggedIn, hasRole(["super_admin"])];

router.post("/products/brands", mPostBrand, brandsController.postBrands);
router.get("/products/brands", brandsController.getBrands);
router.get("/products/brands/:id", brandsController.showBrands);
router.patch("/products/brands/:id", mPatchBrand, brandsController.patchBrands);
router.delete(
  "/products/brands/:id",
  mDeleteBrand,
  brandsController.deleteBrands
);
module.exports = router;
