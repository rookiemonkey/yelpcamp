const mongoose = require("mongoose");

const campSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    campname: {
        type: String,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid camp name') }
        }
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid price for the camp') }
        }
    },
    image: {
        type: String,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid image url for the camp') }
        }
    },
    location: {
        type: String,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid location for the camp') }
        }
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid description for the camp') }
        }
    },
    uploader: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            ref: "User"
        }
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Campground", campSchema)
