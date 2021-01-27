const http = require('http');
const app = require('./app');

const port = process.env.port || 3000;

const server = http.createServer(app);

console.log('API Listening on port:' + port);
server.listen(port);