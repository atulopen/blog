const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    console.log(type, data);

    if (type === 'postCreated') {
        const {id, title} = data;
        posts[id] = {
            id, title, comments: []
        }
    }
    if (type === 'commentCreated') {
        const {id, content, postId, status} = data
        const post = posts[postId];
        post.comments.push({
            id,
            content,
            postId,
            status,
        })
    }

    if (type === 'commentUpdated') {
        const {id, content, postId, status} = data
        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }

    console.log(posts);

    res.send({});
});


module.exports = app;