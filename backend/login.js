const { IncomingMessage, ServerResponse } = require('http');
const { getParams } = require('./getParams');
const { sanitizePhone } = require('./sanitize');
const { createNewOTP } = require('./database');
const { sendOTP } = require('./otpSender');

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
        MESSAGE = 'Bad Request / Invalid Phone Number'
    }
    else {
        STATUS = 'ok'
        MESSAGE = 'Login Attemp Succesfull/ Otp Sent to Mobile'
        let otp=createNewOTP(phoneNum)
        // sendOTP(otp,phoneNum) [ function has been commented due to twilio's limited capabilities on free trial pack]
    }

    let resulJSON = `{"STATUS" : "${STATUS}", "MESSAGE": "${MESSAGE}"}`

    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);

}

module.exports = { loginAPI }