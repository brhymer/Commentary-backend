const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Post"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Comment"
    }]
});

const User = mongoose.model('user', UserSchema);
module.exports = User;