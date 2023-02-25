const ProductModel = require("../models/product.models");
const BrandModel = require("../models/brand.models");
const CategoryModel = require("../models/category.models");
const responseHelper = require("./helper/responseHelper");
const ResultsPerPage = 10;

// image storage config
var imgConfig = {

}

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const Page = Math.max(0, req.params.page)
      const products = await ProductModel.find({}).limit(ResultsPerPage).skip(ResultsPerPage * Page).sort({});

      if (products.length > 0) {
        // console.log(products);
        return res.status(200).json({
          status: 200,
          data: { products, 
          productsCount: products.length, 
          resultPerPage: ResultsPerPage},
          message: "Products fetched successfully",
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "Products Not Found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: "Error while fetching products" });
    }
  },

  getProductById: async (req, res, next) => {
    try {
      let { id } = req.params;
      const product = await ProductModel.findById(id);
      if (product) {
        return res.status(200).json({
          status: 200,
          data: product,
          message: "Product fetched successfully",
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "Product not found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: "Error while fetching product" });
    }
  },

  createProduct: async (req, res, next) => {
    try {

      let { brandId, categoryId } = req.body;
      let user = req.userId;

      let brandExist = await BrandModel.findById(brandId);

      if (!brandExist) {
        return res.status(404).json(responseHelper.error(404, "Brand name not found"));
      }

      let categoryExist = await CategoryModel.findById(categoryId);

      if (!categoryExist) {
        return res.status(404).json(responseHelper.error(404, "Category name not found"));
      }

      let productObj = new ProductModel({ ...req.body, user })

      let product = await productObj.save();

      if (product) {
        return res.status(201).json(responseHelper.successWithResult(201, "Product Created Successfully",));
      } else {
        return res.status(401).json(responseHelper.error(401, "Error while creating product"));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: "Error while creating product" });
    }
  },

  updateProduct: async (req, res, next) => {
    try {

      let { brandId, categoryId, name, description, price, countInStock, rating, numReviews } = req.body;
      let user = req.userId;
      let productId = req.params.id;

      let productExist = await ProductModel.findById(productId);
      if (!productExist) {
        return res.status(404).json(responseHelper.error(404, "Product not found"));
      }

      let brandExist = await BrandModel.findById(brandId);
      if (!brandExist) {
        return res.status(404).json(responseHelper.error(404, "Brand name not found"));
      }

      let categoryExist = await CategoryModel.findById(categoryId);
      if (!categoryExist) {
        return res.status(404).json(responseHelper.error(404, "Category name not found"));
      }

      if (!name || !price || !description || !price || countInStock < 0) {
        return res.status(404).json(responseHelper.error(404, "Enter correct product details"));
      }

      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      let updateProduct = await ProductModel.findByIdAndUpdate({ _id: productId }, { ...req.body, user });

      console.log(updateProduct);

      if (updateProduct) {
        return res.status(201).json(responseHelper.successWithResult(201, "Product Created Successfully", updateProduct));
      } else {
        return res.status(401).json(responseHelper.error(401, "Error while creating product"));
      }

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: "Error while updating product" });
    }
  },

  deleteProductById: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: "Error while deleting product" });
    }
  },
};
