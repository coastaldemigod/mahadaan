const { IncomingMessage, ServerResponse } = require('http');
const { checkDonorAPI } = require('./checkDonor');
const { loginAPI } = require('./login');


/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/
function apiHandler(req, res) {

    const apiURL = req.url;

    if      (apiURL.startsWith('/checkDonor')) checkDonorAPI(req, res)
    else if (apiURL.startsWith('/login')) loginAPI(req, res)
    else res.end('{STATUS: "failed", MESSAGE: "Bad Request"}')

}

module.exports = { apiHandler }