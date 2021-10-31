const { IncomingMessage, ServerResponse, get } = require('http');
const { getParams } = require('./getParams');
const { apiKeyVerify, getDonateStatus, getRequestStatus, getDonateDetail, getRequestDetail, setDonateDetail, setRequestDetail } = require('./database')

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/

// /dashBoardDetail?apikey=123&what=[donor, recipient]
function dashBoardDetail(req, res) {
    let url = req.url;
    let params = getParams(url, ['apikey', 'what']);
    let key = params.apikey, what = params.what;

    let STATUS = '', MESSAGE = '', DATA = '';
    if (apiKeyVerify(key) == false || !(what === 'donor' || what === 'recipient')) {
        STATUS = 'failed'
        MESSAGE = 'Bad Request'
    }
    let phone = apiKeyVerify(key);

    

    let resulJSON = `{"STATUS" : "${STATUS}", "MESSAGE": "${MESSAGE}", "DATA" : "${DATA}" }`
    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);

}

module.exports = { dashBoardDetail }