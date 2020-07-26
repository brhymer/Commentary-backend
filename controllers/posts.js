const db = require('../models');
const cloud = require("../middleware/cloudinary");
const multer  = require('multer');
const path = require("path")
const UPLOAD_PATH = path.resolve(__dirname, '../public/assets/uploads/')
var imgUpload = multer({ dest: UPLOAD_PATH })
const fs = require("fs");
// const { nextTick } = require('process');

const index = (req, res) => {
    db.Post.find({}, (err, foundPosts) => {
        if (err) console.log('Error in post index: ', err)

        if(!foundPosts) return res.json({
            message: 'No posts found'
        })
        res.status(200).json({ posts: foundPosts })
    })
}

async function create(req, res) {
    
    db.Post.create(req.body, (err, savedPost) => {
        
        // console.log(req.file)
        if (err) console.log('Error in post create: ', err)
        // let imgObject;
        // if (req.file) {
        //     imgObject = cloud.cloudUpload(req.file.path)
        // } else {
        //     console.log("no image file")
        // }
        res.status(200).json({ post: savedPost })
        // console.log(req.file)
        // if (req.file) fs.unlinkSync(req.file.path)
    })
}

// const create = async (req, res, next) => {
    // try {
    // imgUpload.multUpload.single("imgFile"),

    // db.Post.create(req.body, async (err, savedPost) => {
    //     if (err) console.log('Error in post create: ', err)
        // try {
        //     if (req.file) {console.log("file attached")} else {console.log("no file")}
        //     if (req.file) {
        //         let imgObject = await cloud.cloudUpload(req.file.path)
        //     } else {
        //         console.log("no image file")
        //     }
            // res.status(200).json({ post: savedPost })
            // if (req.file) fs.unlinkSync(req.file.path)
//         } catch (err) {
//             next(err)
//         }
//     })
// }   catch (err) {
//     next(err)
// }
// }

// const create = (req, res) => {
//     db.Post.create(req.body, (err, savedPost) => {
//         if (err) console.log('Error in post create: ', err)
//             res.status(200).json({ post: savedPost })
//     })
// }





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