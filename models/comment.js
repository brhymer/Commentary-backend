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
    userId: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }]
});

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;