const db = require('../models')

const index = (req, res) => {
    db.Post.find({}, (err, foundPosts) => {
        if (err) console.log('Error in post index: ', err)

        if(!foundPosts) return res.json({
            message: 'No posts found'
        })
        res.status(200).json({ posts: foundPosts })
    })
}

const create = (req, res) => {
    db.Post.create(req.body, (err, savedPost) => {
        if (err) console.log('Error in post create: ', err)

        res.status(200).json({ post: savedPost })
    })
}

const update = (req, res) => {
    db.Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPost) => {
        if (err) console.log('Error in post update: ', err)

        if(!updatedPost) return res.json({
            message: "Could not update that post"
        })
        res.status(200).json({ post: updatedPost})
    })
}

const destroy = (req, res) => {
    db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
        if (err) console.log('Error in post delete: ', err)

        if (!deletedPost) return res.json({
            message: "No post with that ID"
        })
        res.status(200).json({ post: deletedPost })
    })
}

module.exports = {
    index, create, update, destroy
}