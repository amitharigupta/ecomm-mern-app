const express = require("express");
const ProductController = require("../controllers/ProductController.js");
const authMiddleWare = require("../middleware/auth");

const router = express.Router();

router.get("/all", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.post("/", authMiddleWare.isUserAdminLogin, ProductController.createProduct);

router.patch("/", ProductController.updateProduct);

router.delete("/:id", ProductController.deleteProductById);

module.exports = router;
