const { response } = require("express");
const ProductModel = require("../models/product.models");

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const products = await ProductModel.find({});

            if(products.length > 0) {
                return res.status(200).json({ status: 200, data: products, message: "Products fetched successfully" });
            } else {
                return res.status(404).json({ status: 404, message: "Products Not Found" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Error while fetching products" });
        }
    },

    getProductById: async (req, res, next) => {
        try {
            let { id } = req.params;
            const product = await ProductModel.findById(id);
            if(product) {
                return res.status(200).json({ status: 200, data: product, message: "Product fetched successfully" });
            } else {
                return res.status(404).json({ status: 404, message: "Product not found" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Error while fetching product" });
        }
    },

    createProduct: async (req, res, next) => {
        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Error while creating product" });
        }
    },

    updateProduct: async() => {
        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Error while updating product" });
        }
    },

    deleteProduct: async() => {
        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Error while deleting product" });
        }
    }
}