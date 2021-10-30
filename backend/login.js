const { IncomingMessage, ServerResponse } = require('http');
const { getParams } = require('./getParams');
const { sanitizePhone } = require('./sanitize');

// login?phonenumber=99898989898
/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/
function loginAPI(req, res) {

    // sanitize params 
    let phoneNum = getParams(req.url, ['phonenumber'])['phonenumber']
    phoneNum = sanitizePhone(phoneNum)

    let STATUS = '', MESSAGE = '';

    // logic
    if (phoneNum == null) {
        STATUS = 'failed'
        MESSAGE = 'Bad Request'
    }
    else {
        STATUS = 'ok'
        MESSAGE = 'Login Attemp Succesfull/ Otp Sent to Mobile'
        // create new OTP and send it to user
    }

    let resulJSON = `{"STATUS" : "${STATUS}", "MESSAGE": "${MESSAGE}"}`

    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);

}

module.exports = { loginAPI }