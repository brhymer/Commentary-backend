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
        required: true
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],
    comments: {
        type: Number
    }
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;