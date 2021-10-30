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

    console.log(DATABASE2)
}

function isValidPhone(pn) {
    return DATABASE[pn] != undefined;
}

function phoneToToken(pn) {
    return DATABASE[pn];
}


module.exports = { isValidPhone, phoneToToken, createNewOTP }
