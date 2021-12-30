const express = require('express');
const cors = require('cors');
const {randomBytes} = require('crypto')
const axios = require("axios");

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

    axios.post('http://localhost:4005/events', {
        type: 'postCreated',
        data: {
            id,
            title
        }
    })

    res.status(201).send(posts[id]);
});

app.get('/posts', (req, res, next) => {
    res.send(posts);
})

app.post('/events', (req, res) => {
    console.log('Events Received', req.body.type);
    res.send({});
});


module.exports = app;