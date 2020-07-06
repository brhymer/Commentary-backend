const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const port = 3002;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();

app.use(express.json());
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

app.use(cors(corsOptions));

app.use('/auth', routes.auth)
app.use('/comments', routes.comments)
app.use('/posts', routes.posts)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});