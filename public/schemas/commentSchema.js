const mongoose = require("mongoose");

let today = Date();

let commentSchema = mongoose.Schema({
    createdAt: {
      type: Date,
      default: Date.now
    },
    comment: String,
    author: {
          id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
          },
          name: {
              type: String,
              ref: "User"
          }
    }
})

module.exports = mongoose.model("Comment", commentSchema);