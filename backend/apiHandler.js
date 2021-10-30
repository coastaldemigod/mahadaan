const { IncomingMessage, ServerResponse } = require('http');

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/
function apiHandler(req, res) {
    if(req.url=="/")
    res.end('Server for blood Donation');
    else
    res.end("different output");
}

module.exports = { apiHandler }