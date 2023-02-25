const CategoryModel = require("../models/category.models");
const responseHelper = require("./helper/responseHelper");

module.exports = {
  getAllCategorys: async (req, res, next) => {
    try {
      const categorys = await CategoryModel.find({}).sort({ "createdAt": "desc"});

      if (categorys.length > 0) {
        // console.log(products);
        return res.status(200).json({
          status: 200,
          data: categorys,
          message: "Categorys fetched successfully",
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "Categorys Not Found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: "Error while fetching Categorys" });
    }
  }
};
