const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "brands"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "categorys"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "review"
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    numReviews: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 100
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true} )

const ProductModel = new mongoose.model("products", productSchema)

module.exports = ProductModel;