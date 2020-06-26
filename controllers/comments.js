const db = require('../models')

const index = (req, res) => {
    db.Comment.find({}, (err, foundComments) => {
        if (err) console.log('Error in comment index: ', err)

        if(!foundComments) return res.json({
            message: 'No comments found'
        })
        res.status(200).json({ comments: foundComments })
    })
}

const create = (req, res) => {
    db.Comment.create(req.body, (err, savedComment) => {
        if (err) console.log('Error in comment create: ', err)

        res.status(200).json({ comment: savedComment })
    })
}

const update = (req, res) => {
    db.Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedComment) => {
        if (err) console.log('Error in comment update: ', err)

        if(!updatedComment) return res.json({
            message: "Could not update that comment"
        })
        res.status(200).json({ comment: updatedComment})
    })
}

const destroy = (req, res) => {
    db.Comment.findByIdAndDelete(req.params.id, (err, deletedComment) => {
        if (err) console.log('Error in comment delete: ', err)

        if (!deletedComment) return res.json({
            message: "No comment with that ID"
        })
        res.status(200).json({ comment: deletedComment })
    })
}

module.exports = {
    index, create, update, destroy
}