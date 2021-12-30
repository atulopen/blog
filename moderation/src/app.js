const express = require('express');
const axios = require("axios");

const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    console.log('Events Received', req.body.type);
    if (type === 'commentCreated') {
        const {id, content, postId} = data;
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4005/events', {
            type: 'commentModerated',
            data: {
                id,
                content,
                postId,
                status,
            }
        })

        res.send({status: 'OK'});
    }

});


module.exports = app;