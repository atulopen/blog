const http = require('http');
const {app, handleEvents} = require("./app");
const axios = require("axios");

const PORT = 4002
const server = http.createServer(app);

server.listen(PORT, async () => {
    console.log(`Server listening at ${PORT}`);

    const res = await axios.get('http://event-bus-srv:4005/events');
    for (let event of res.data) {
        const {type, data} = event;
        handleEvents(type, data);
    }

});

