const multer = require("multer");
// // const datauri = require("datauri");
const path = require("path");

// const multUpload = multer({
//     dest: `${__dirname}/../public/assets/uploads/`
// });
  
const storage = multer.diskStorage({
    destination: `${__dirname}/../public/assets/uploads/`,
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));        
    }
});

const multUpload = multer({ storage: storage }).single("imgFile");
module.exports = { multUpload };