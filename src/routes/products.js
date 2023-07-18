const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, hasRole } = require("../shared/auth");
const {
  postProductsSchema,
  patchProductsSchema,
} = require("../controllers/products/schemas/index");
const productsController = require("../controllers/products");
const upload = require("../uploads");

const router = express.Router();

const mPostProducts = [
  upload.array("image"),
  isLoggedIn,
  hasRole(["admin"]),
  genValidator(postProductsSchema),
];
const mPatchProducts = [
  upload.array("image"),
  isLoggedIn,
  // hasRole(["admin"]),
  genValidator(patchProductsSchema),
];
const mDeleteProducts = [isLoggedIn, hasRole(["super_admin", "admin"])];

router.post("/products", mPostProducts, productsController.postProducts);
router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.showProducts);
router.patch("/products/:id", mPatchProducts, productsController.patchProducts);
router.delete(
  "/products/:id",
  mDeleteProducts,
  productsController.deleteProducts
);
module.exports = router;
