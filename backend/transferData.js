const { IncomingMessage, ServerResponse } = require('http');
const {getParams} = require('./getParams');
const {apiKeyVerify,getDonateStatus,getRequestStatus,getDonateDetail,getRequestDetail,setDonateDetail,setRequestDetail} = require('./database')

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/

function transferData(req,res){

    const url = decodeURI(req.url);
    const mode = getParams(url,['mode']);
    const dt=getParams(url,['apikey','what']);
    // console.log(mode.mode);
    const key=dt.apikey;
    const what=dt.what;
    let STATUS,MESSAGE,DATA;
    if(apiKeyVerify(key)==false)
    {
        console.log("f1");
        STATUS="FAILED";
        MESSAGE="invalid request";
        DATA="";
    }
    else if(mode.mode == 'GET')
    {
        if(what=='donateStatus')
        {
            console.log("sent");
            STATUS="ok";
            MESSAGE="donate status sent";
            DATA=getDonateStatus(apiKeyVerify(key)).toString();
        }
        else if(what=='requestStatus')
        {
            STATUS="ok";
            MESSAGE="request status sent";
            DATA=getRequestStatus(apiKeyVerify(key)).toString();
        }
        else if(what=='donateDetail' && getDonateDetail(apiKeyVerify(key))!=false)
        {
            STATUS="ok";
            MESSAGE="donate details sent";
            DATA=JSON.stringify(getDonateDetail(apiKeyVerify(key))).replace(/\"/g,"\'");
        }
        else if(what=='RequestDetail'&& getRequestDetail(apiKeyVerify(key))!=false)
        {
            STATUS="ok";
            MESSAGE="request details sent";
            DATA=JSON.stringify(getRequestDetail(apiKeyVerify(key))).replace(/\"/g,"\'");
        }
        else
        {
            STATUS="FAILED";
            MESSAGE="invalid request";
            DATA="";
        }
    }
    else if(mode.mode=="POST")
    {
        if(what=='donateDetail')
        {
            let data=getParams(url,['whatData']);
            // console.log(data.whatData);
            let phn=apiKeyVerify(key);
            setDonateDetail(phn,JSON.parse(data.whatData));
            STATUS="ok";
            MESSAGE="donate details saved";
            DATA=data.whatData.replace(/\"/g,"\'");
            // console.log(DATA);
        }
        else if(what=='RequestDetail')
        {
            let data=getParams(url,['whatData']);
            let phn=apiKeyVerify(key);
            setRequestDetail(phn,JSON.parse(data.whatData));
            STATUS="ok";
            MESSAGE="request details saved";
            DATA=data.whatData.replace(/\"/g,"\'");
        }
        else
        {
            STATUS="FAILED";
            MESSAGE="invalid request";
            DATA="";
        }
    }
    else
    {
        STATUS="FAILED";
        MESSAGE="invalid request";
        DATA="";
    }

    let resulJSON = `{"STATUS" : "${STATUS}", "MESSAGE": "${MESSAGE}", "DATA" : "${DATA}" }`
    console.log([resulJSON]);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);
}

module.exports={transferData}