const http = require('http');
const app = require("./app");

const PORT = 4002
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});

