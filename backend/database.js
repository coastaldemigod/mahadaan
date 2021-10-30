const crypt = require('crypto');

let DATABASE = {
    // phoneNumber : ApiToken
}
let DATABASE2 = {
    // phonenumber : otp
}

function createNewOTP(pn) {
    let OTP = "", len = 6;
    for (let i = 0; i < len; i++)
        OTP += Math.floor((Math.random() * 100) % 10);
    DATABASE2[pn] = OTP;
    console.log(DATABASE2)
}
function checkOTP(pn, otp) {
    return DATABASE2[pn] === otp;
}

function isValidPhone(pn) {
    return DATABASE[pn] !== undefined;
}

function createNewApiToken(pn) {
    let hash = crypt.createHash('md5').update(pn + new Date()).digest('hex');
    DATABASE[pn] = hash
}

function phoneToToken(pn) {
    return DATABASE[pn];
}

const donordata = [
    {
        "name": "noob malhotra",
        "age": "28",
        "gender": "male",
        "email": "demo@demo.demo",
        "phone": "9876543210",
        "blood": "A+",
        "cause": "diaorhea",
        "country": "India",
        "state": "uttar pradesh",
        "city": "agra",
        "key": "someRandomHashKey"
    },
    {
        "name": "noob malhotra",
        "age": "28",
        "gender": "male",
        "email": "demo@demo.demo",
        "phone": "9876543210",
        "blood": "A+",
        "cause": "diaorhea",
        "country": "India",
        "state": "Uttar pradesh",
        "city": "Agra",
        "key": "someRandomHashKey"
    },
    {
        "name": "noob malhotra",
        "age": "28",
        "gender": "male",
        "email": "demo@demo.demo",
        "phone": "9876543210",
        "blood": "A+",
        "cause": "diaorhea",
        "country": "India",
        "state": "Uttar Pradesh",
        "city": "Agra",
        "key": "someRandomHashKey"
    },
    {
        "name": "noob malhotra",
        "age": "28",
        "gender": "male",
        "email": "demo@demo.demo",
        "phone": "9876543210",
        "blood": "A+",
        "cause": "diaorhea",
        "country": "India",
        "state": "uttar pradesh",
        "city": "agra",
        "key": "someRandomHashKey"
    }
];

function validDonorCount(data) {
    return donordata.filter((dt) => {
        let bo = 1;
        for (let [key, value] of Object.entries(data)) {
            if (dt[key] != value) {
                bo = 0;
                break;
            }
        }
        if (bo == 1)
            return true;
        else
            return false;
    }).length;
}

module.exports = { isValidPhone, phoneToToken, createNewOTP, checkOTP, createNewApiToken, validDonorCount }