const express = require('express');
const axios = require("axios");


const app = express();

const events = [];


app.use(express.json());

app.post('/events', async (req, res) => {

    const event = req.body;
    console.log(event.type);
    events.push(event);

    await axios.post('http://posts-clusterip-srv:4000/events', event).catch(() => {

    });
    await axios.post('http://comments-srv:4001/events', event).catch(() => {

    });
    await axios.post('http://query-srv:4001/events', event).catch(() => {

    });
    await axios.post('http://moderation-srv:4001/events', event).catch(() => {

    });

    res.send({status: 'OK'});

});

app.get('/events', (req, res) => {
    console.log('events', events);
    res.send(events);
})


module.exports = app;