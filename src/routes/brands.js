const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, isAdmin } = require("../shared/auth");
const {
  postBrandsSchema,
  patchBrandsSchema,
} = require("../controllers/brands/schemas");
const brandsController = require("../controllers/brands");
const upload = require("../uploads");

const router = express.Router();

const mPostBrand = [
  upload.single("image"),
  isLoggedIn,
  isAdmin,
  genValidator(postBrandsSchema),
];
// const mGetBrands = [isLoggedIn];
// const mShowBrands = [isLoggedIn];
const mPatchBrand = [
  upload.single("image"),
  isLoggedIn,
  isAdmin,
  genValidator(patchBrandsSchema),
];
const mDeleteBrand = [isLoggedIn, isAdmin];

router.post("/brands", mPostBrand, brandsController.postBrands);
router.get("/brands", brandsController.getBrands);
router.get("/brands/:id", brandsController.showBrands);
router.patch("/brands/:id", mPatchBrand, brandsController.patchBrands);
router.delete("/brands/:id", mDeleteBrand, brandsController.deleteBrands);
module.exports = router;
