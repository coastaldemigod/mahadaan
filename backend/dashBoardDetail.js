const { IncomingMessage, ServerResponse, get } = require('http');
const { getParams } = require('./getParams');
const { apiKeyVerify, findRequest, getDonateDetail, getDonor} = require('./database')

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
            // currently only city is being matched due to an error in parsing blood groups. [ To be resolved ]
            DATA = JSON.stringify(res).replace(/\"/g,"\'");;
            console.log(DATA);
        }
        else {
             // get donate details
             let res = getDonor(phone);
             // currently only city is being matched due to an error in parsing blood groups. [ To be resolved ]
             DATA = JSON.stringify(res).replace(/\"/g,"\'");;
             console.log(DATA);
        }
    }

    let resulJSON = `{"STATUS" : "${STATUS}", "MESSAGE": "${MESSAGE}", "DATA" : "${DATA}" }`
    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);

}

module.exports = { dashBoardDetail }