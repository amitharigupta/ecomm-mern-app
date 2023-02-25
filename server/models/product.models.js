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
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
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
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
        min: 100
    },
    countInStock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        min: 0,
        default: 1
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

const ProductModel = new mongoose.model("products", productSchema)

module.exports = ProductModel;