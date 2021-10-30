const { IncomingMessage, ServerResponse } = require('http');
const { getParams } = require('./getParams');
const { sanitizePhone } = require('./sanitize');
const { checkOTP, isValidPhone , phoneToToken, createNewApiToken} = require('./database');

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/
function otpVerification(req, res) {
    
    let params = getParams(req.url, ['phonenumber', 'otp']);
    let phoneNum = params['phonenumber']
    let otp = params['otp'] + ""

    phoneNum = sanitizePhone(phoneNum)

    let STATUS = '', MESSAGE = '', APIKEY = '';

    // logic
    if (phoneNum == null) {
        STATUS = 'failed'
        MESSAGE = 'Bad Request / Invalid Phone Number'
    }
    else if ( !checkOTP(phoneNum, otp)){
        STATUS = 'failed'
        MESSAGE = 'Wrong OTP'
    }
    else {
        if (!isValidPhone(phoneNum))
            createNewApiToken(phoneNum)
        APIKEY = phoneToToken(phoneNum)
        STATUS = 'ok'
        MESSAGE = 'Succesfull'
    }
    let resulJSON = `{"STATUS" : "${STATUS}", "MESSAGE": "${MESSAGE}", "APIKEY":"${APIKEY}"}`

    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);
}

module.exports = { otpVerification }