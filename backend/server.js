const http = require('http');
const { apiHandler } = require('./apiHandler');
const PORT = 5000;

let server = http.createServer(apiHandler);

server.listen(PORT, '0.0.0.0', () => {
    console.log('[SERVER STARTED] [http://localhost:5000/]');
});