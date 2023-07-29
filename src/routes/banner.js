const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, hasRole } = require("../shared/auth");
const {
  postBannerSchema,
  patchBannerSchema,
  getBannerSchema,
} = require("../controllers/banner/schemas/index");
const bannerController = require("../controllers/banner");
const upload = require("../uploads");

const router = express.Router();

const sPostBanner = [
  upload.single("image"),
  isLoggedIn,
  hasRole(["super_admin"]),
  genValidator(postBannerSchema),
];
// const sGetBanner = [isLoggedIn];
// const mShowBanner = [isLoggedIn];

const sGetBanner = [
  // isLoggedIn,
  // hasRole(["super_admin"]),
  genValidator(getBannerSchema),
];

const sPatchBanner = [
  upload.single("image"),
  isLoggedIn,
  hasRole(["super_admin"]),
  genValidator(patchBannerSchema),
];

const mDeleteBanner = [isLoggedIn, hasRole(["super_admin"])];

router.post("/banner", sPostBanner, bannerController.postBanner);

router.get("/banner", bannerController.getBanner);

router.get("/banner/:id", sGetBanner, bannerController.showBanner);

router.patch("/banner/:id", sPatchBanner, bannerController.patchBanner);

router.delete("/banner/:id", mDeleteBanner, bannerController.deleteBanner);
module.exports = router;
