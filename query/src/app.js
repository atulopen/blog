const express = require('express');

const app = express();

app.use(express.json());

const posts = {};

app.get('posts', (req, res) => {
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    console.log(type,data);

    if (type === 'postCreated') {
        const {id, title} = data;
        posts[id] = {
            id, title, comments: []
        }
    }
    if (type === 'commentCreated') {
        const {id, content, postId} = data
        const post = posts[postId];
        post.comments.push({
            id,
            content,
            postId
        })
    }
    console.log(posts);

    res.send({});
});


module.exports = app;