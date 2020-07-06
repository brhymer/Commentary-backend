const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Post",
        required: true
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }]
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;