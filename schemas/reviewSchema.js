const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: "Please provide a rating (1-5 stars).",
        min: 1,
        max: 5,
        validate(value) {
            if (!Number.isInteger(value)) {
                throw new Error('Please provide a valid rating value: interger')
            }
        }
    },
    text: {
        type: String
    },
    author: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        avatar: String
    },
    campground: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campground"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);