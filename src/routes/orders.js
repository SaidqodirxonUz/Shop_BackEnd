const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, hasRole } = require("../shared/auth");
const {
  postOrderSchema,
  patchOrderSchema,
} = require("../controllers/orders/schemas/index");
const OrderController = require("../controllers/orders");
// const upload = require("../uploads");

const router = express.Router();

const mPostBrand = [
  // upload.single("image"),
  isLoggedIn,
  // hasRole(["super_admin"]),
  genValidator(postOrderSchema),
];
// const mGetOrder = [isLoggedIn];
// const mShowOrder = [isLoggedIn];
const mPatchBrand = [
  // upload.single("image"),
  isLoggedIn,
  // hasRole(["super_admin"]),
  genValidator(patchOrderSchema),
];
const mDeleteBrand = [isLoggedIn];

router.post("/products/order", mPostBrand, OrderController.postOrder);
router.get("/products/order", OrderController.getOrder);
router.get("/products/order/:id", OrderController.showOrder);
router.patch("/products/order/:id", mPatchBrand, OrderController.patchOrder);
router.delete("/products/order/:id", mDeleteBrand, OrderController.deleteOrder);
module.exports = router;
