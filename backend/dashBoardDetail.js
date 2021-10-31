const { IncomingMessage, ServerResponse, get } = require('http');
const { getParams } = require('./getParams');
const { apiKeyVerify, findRequest, getDonateDetail } = require('./database')

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
    else {
        let phone = apiKeyVerify(key);

        STATUS = 'ok'
        MESSAGE = 'Succesfull'
        if (what === 'donor') {
            // get donate details
            let res = findRequest(getDonateDetail(phone).city);
            DATA = JSON.stringify(res);
        }
        else {

        }
    }

    let resulJSON = `{"STATUS" : "${STATUS}", "MESSAGE": "${MESSAGE}", "DATA" : "${DATA}" }`
    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);

}

module.exports = { dashBoardDetail }