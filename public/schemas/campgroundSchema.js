const mongoose = require("mongoose");

const campSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    campname: String,
    price: String,
    image: String,
    location: String,
    lat: Number,
    lng: Number,
    description: String,
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
    ]
});

module.exports = mongoose.model("Campground", campSchema)
