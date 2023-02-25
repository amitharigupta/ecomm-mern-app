const express = require("express");
const CategoryController = require("../controllers/CategoryController.js");

const router = express.Router();

router.get("/all", CategoryController.getAllCategorys);

module.exports = router;
