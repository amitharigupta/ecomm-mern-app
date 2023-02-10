const ProductModel = require("../models/product.models");

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const products = await ProductModel.find({});

            if(products.length > 0) {
                return res.json({ status: 200, data: products, message: "Products fetched successfully" });
            } else {
                return res.json({ status: 404, message: "Products Not Found" });
            }
        } catch (error) {
            console.log(error);
            return res.json({ status: 500, message: "Error while fetching products" });
        }
    },

    getProductById: async (req, res, next) => {
        try {
            let { id } = req.params;
            const product = await ProductModel.findById(id);
            if(product) {
                return res.json({ status: 200, data: product, message: "Product fetched successfully" });
            } else {
                return res.json({ status: 404, message: "Product not found" });
            }
        } catch (error) {
            console.log(error);
            return res.json({ status: 500, message: "Error while fetching product" });
        }
    }
}