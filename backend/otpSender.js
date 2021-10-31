/**
 * pn = string
 * will otp to phone number
 * and save to Database
*/

const {message} = require('./messagingapi');

function sendOTP(otp,pn) {
    message(otp,pn);
}

module.exports = { sendOTP }