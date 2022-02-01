const express = require('express');
const cors = require('cors');
const {randomBytes} = require('crypto')
const axios = require("axios");

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
    const status = 'pending';

    const comments = commentsByPostId[postId] || [];

    comments.push({
        id: commentId,
        content,
        status,
    })

    commentsByPostId[postId] = comments;

    axios.post('http://event-bus-srv:4005/events', {
        type: 'commentCreated',
        data: {
            id: commentId,
            content,
            postId,
            status,
        }
    })


    return res.status(201).json(comments);
})

app.get('/posts/:postId/comments', (req, res) => {

    const {postId} = req.params
    return res.json(commentsByPostId[postId] || []);

});


app.post('/events', async (req, res) => {
    console.log('Events Received', req.body.type);
    const {type, data} = req.body;
    console.log(type);
    console.log(data);
    if (type === 'commentModerated') {
        const {id, status, postId, content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id === id);
        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'commentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }
    res.send({});
});


module.exports = {
    app
}