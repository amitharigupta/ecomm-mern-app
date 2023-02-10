const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true} )

const ReviewModel = new mongoose.model("review", reviewSchema)

module.exports = ReviewModel;