const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudUpload = (imagePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imagePath, (err, imgObj) => {
            if (err) return reject(err);
            return resolve(imgObj);
        });
    });
}

cloudDelete = (imageId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(imageId, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
}

module.exports = { cloudinary, cloudUpload, cloudDelete };