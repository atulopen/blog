const express = require('express');
const cors = require('cors');
const {randomBytes} = require('crypto')

const app = express();

const commentsByPostId = {}

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.post('/posts/:postId/comments', (req, res) => {

    const {content} = req.body;
    const {postId} = req.params;
    const commentId = randomBytes(4).toString('hex');

    const comments = commentsByPostId[postId] || [];

    comments.push({
        id: commentId,
        content
    })

    commentsByPostId[postId] = comments;

    return res.status(201).json(comments);
})

app.get('/posts/:postId/comments', (req, res) => {

    const {postId} = req.params
    return res.json(commentsByPostId[postId] || []);

});


module.exports = {
    app
}