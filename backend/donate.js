const { IncomingMessage, ServerResponse, get } = require('http');
const { getParams } = require('./getParams');
const { apiKeyVerify, setDonate, requestExist} = require('./database');
const { __esModule } = require('node-fetch');

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/

// /donate?apikey=123&recphone=1233
function donate(req,res){
    let url = req.url;
    let params = getParams(url, ['apikey', 'recphone']);
    let key = params.apikey, recphone = params.recphone;
    let STATUS = '', MESSAGE = '', DATA = '';

    if(apiKeyVerify(key)==false || requestExist(recphone)==false){
        STATUS="failed";
        MESSAGE="Bad Request"
    }
    else
    {
        setDonate(apiKeyVerify(key),recphone);
        STATUS="ok";
        MESSAGE="Donation sent. Waiting to accepted by recipient"
    }

    let resulJSON = `{"STATUS" : "${STATUS}", "MESSAGE": "${MESSAGE}", "DATA" : "${DATA}" }`
    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);
}

module.exports ={donate};