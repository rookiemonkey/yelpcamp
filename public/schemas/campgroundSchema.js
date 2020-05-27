const mongoose = require("mongoose");

let campSchema = mongoose.Schema({
    campname: String,
    price: String,
    image: String,
    location: String,
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
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// this is a pre hook that suppose to help with the campground deletion
// however this is not working ..
// campSchema.pre('remove', async function() {
// 	await Comment.remove({
// 		_id: {
// 			$in: this.comments
// 		}
// 	});
// });

module.exports = mongoose.model("Campground", campSchema)
