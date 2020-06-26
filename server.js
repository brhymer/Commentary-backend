const express = require('express');
const app = express();
const cors = require('cors');
const port = 3002;
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();


app.use(session({
    store: new MongoStore({ url: "mongodb://localhost:27017/comment-section"}),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000000
    }
}))

app.use('/auth', routes.auth)
app.use('/comments', routes.comments)
app.use('/posts', routes.posts)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});