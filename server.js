const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const port = process.env.PORT || 3002;
const session = require('express-session');
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session);
const { cloudinary } = require('./middleware/cloudinary');
require('dotenv').config();

app.use(express.json({ limit: '50mb'}));
// app.use(session({
//     store: new MongoStore({ url: "mongodb://localhost:27017/comment-section"}),
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000000
//     }
// }))

const corsOptions = {
    origin: `http://localhost:3003`,
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(express.static('./public'));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', routes.auth)
app.use('/comments', routes.comments)
app.use('/posts', routes.posts)

app.get('/images', async (req, res) => {
    const {resources} = await cloudinary.search
    .expression('folder:upload')
    .sort_by('public_id', 'desc')
    .max_results(10)
    .execute();
    const publicIDs = resources.map( file => file.public_id);
    // console.log(resources)
    res.send(publicIDs)
    })

app.post('/upload', async (req, res) => {
    try {
        const file = req.body.data
        const publicID = req.body.id
        // console.log("file received: ", file)
        const uploadRes = await cloudinary.uploader.upload(file, {
            upload_preset: 'upload',
            public_id: publicID
        })
        // console.log(uploadRes)
        res.json({msg: 'noice'})
    } catch (err) {
        console.error(err);
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});