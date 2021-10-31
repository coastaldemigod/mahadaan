const { IncomingMessage, ServerResponse, get } = require('http');
const { getParams } = require('./getParams');
const { apiKeyVerify, completeRequest, donorExist} = require('./database');
const { __esModule } = require('node-fetch');

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/

// /donate?apikey=123&donphone=1233
function accept(req,res){
    let url = req.url;
    let params = getParams(url, ['apikey', 'donphone']);
    let key = params.apikey, recphone = params.donphone;
    let STATUS = '', MESSAGE = '', DATA = '';

    if(apiKeyVerify(key)==false || donorExist(donphone)==false){
        STATUS="failed";
        MESSAGE="Bad Request"
    }
    else
    {
        completeRequest(apiKeyVerify(key));
        STATUS="ok";
        MESSAGE="Donation accepted by recipient"
    }
    
    let resulJSON = `{"STATUS" : "${STATUS}", "MESSAGE": "${MESSAGE}", "DATA" : "${DATA}" }`
    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);
}

module.exports ={accept};