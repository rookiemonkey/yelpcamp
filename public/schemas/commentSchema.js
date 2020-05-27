const mongoose = require("mongoose");

let today = Date();

let commentSchema = mongoose.Schema({
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
    },
    date: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model("Comment", commentSchema);