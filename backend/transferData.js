const { IncomingMessage, ServerResponse } = require('http');
const {getParams} = require('./getParams');
const {apiKeyVerify,getDonateStatus,getRequestStatus} = require('./database')

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/

function transferData(req,res){

    const url = decodeURI(req.url);
    const mode = req.mode;
    const {key,what}=getParams(url,['apikey','what']);

    if(apiKeyVerify(key)==false)
    {
        let resulJSON = `{"STATUS" : "200", "MESSAGE": "Invalid Key", "DATA" : "" }`
        res.writeHead(200, { "content-type": "application/json" });
        res.end(resulJSON);
    }

    let STATUS,MESSAGE,DATA;
    if(mode == 'GET')
    {
        if(what=='donateStatus')
        {
            STATUS="200";
            MESSAGE="donate status sent"
            DATA=getDonateStatus(apiKeyVerify(key)).toString();
        }
        else if(what=='requestStatus')
        {
            STATUS="200";
            MESSAGE="request status sent"
            DATA=getRequestStatus(apiKeyVerify(key)).toString();
        }
    }

}

module.exports={transferData}