const crypt = require('crypto');

let DATABASE = {
    // phoneNumber : ApiToken
    '969696': 'AFjdJdsafH3las145823902afd'
}
let DATABASE2 = {

}

function createNewOTP(pn) {
    let OTP = "", len = 6;
    for (let i = 0; i < len; i++) 
        OTP += Math.floor((Math.random() * 100) % 10);
    DATABASE2[pn] = OTP;
    // console.log(DATABASE2)
}
function checkOTP(pn, otp){
    return DATABASE2[pn] === otp;
}

function isValidPhone(pn) {
    return DATABASE[pn] !== undefined;
}

function createNewApiToken(pn){
    let hash = crypt.createHash('md5').update(pn + new Date()).digest('hex');
    DATABASE[pn] = hash
}

function phoneToToken(pn) {
    return DATABASE[pn];
}


module.exports = { isValidPhone, phoneToToken, createNewOTP, checkOTP, createNewApiToken}
