const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        // required: true
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],
    comments: {
        type: Number
    },
    imgUrl: {
        type: String,
    },
    imgPublicId: String
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;