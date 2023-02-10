const express = require("express");
const ProductController = require("../controllers/ProductController.js");

const router = express.Router();

router.get('/all', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductById);

module.exports = router;