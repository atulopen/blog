const http = require('http');
const app = require('./app');

const PORT = 4000;

const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log(`v55`);
    console.log(`Server listening at ${PORT}`)
})