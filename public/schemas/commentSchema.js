const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid comment') }
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Comment", commentSchema);