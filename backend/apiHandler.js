const { IncomingMessage, ServerResponse } = require('http');
const { checkDonorAPI } = require('./checkDonor');
const { loginAPI } = require('./login');
const { otpVerification } = require('./otpVerification');
const { transferData } = require('./transferData');
const { dashBoardDetail } = require('./dashBoardDetail');
const {donate} = require('./donate');
const {accept} = require('./accept');

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/
function apiHandler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days

    const apiURL = req.url;

    if (apiURL.startsWith('/checkDonor')) checkDonorAPI(req, res);
    else if (apiURL.startsWith('/login')) loginAPI(req, res);
    else if (apiURL.startsWith('/otpVerification')) otpVerification(req, res);
    else if (apiURL.startsWith('/transferData')) transferData(req, res);
    else if (apiURL.startsWith('/dashBoardDetail')) dashBoardDetail(req, res);
    else if (apiURL.startsWith('/donate')) donate(req, res);
    else if (apiURL.startsWith('/accept')) accept(req, res);
    else res.end('{STATUS: "failed", MESSAGE: "Bad Request"}');

}

module.exports = { apiHandler }