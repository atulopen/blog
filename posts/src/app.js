const express = require('express');
const cors = require('cors');
const {randomBytes} = require('crypto')

const app = express();

const posts = {}

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.post('/posts', (req, res, next) => {
    const {title} = req.body;
    const id = randomBytes(4).toString('hex');

    posts[id] = {
        id, title
    };

    res.status(201).send(posts[id]);
});

app.get('/posts', (req, res, next) => {
    res.send(posts);
})


module.exports = app;