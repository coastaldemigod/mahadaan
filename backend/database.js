const crypt = require('crypto');

let DATABASE = {
    // phoneNumber : ApiToken
    1234567890: "somerandomkey",
    2345678901: "somerandomkey",
    4567890123: "0787d6cc1412c83ea12f7f97adcc7338"
}
let DATABASE2 = {
    // phonenumber : otp
}

let DATABASE3 = {
    // phoneNumber : donateStatus
    4567890123:"true"
}

let DATABASE4 = {
    // phoneNumber : requestStatus
    2345678901:"true",
    1234567890:"true"
}

let DATABASE5 = {
    // for DONOR
    // phoneNumber : { name : "somein" , age : "123" , etc......}
    4567890123 : {
        "name": "noob malhotra",
        "age": "28",
        "gender": "male",
        "email": "demo@demo.demo",
        "phone": "4567890123",
        "blood": "A+",
        "address": "some thing",
        "country": "India",
        "state": "Uttar Pradesh",
        "city": "Agra"
    },
    2345678901: {
        "name": "noobest malhotra",
        "age": "28",
        "gender": "male",
        "email": "demo@demo.demo",
        "phone": "2345678901",
        "blood": "A+",
        "cause": "diaorhea",
        "country": "India",
        "state": "Uttar Pradesh",
        "city": "Agra",
     }
}

let DATABASE6 = {
    // for Request
    // phoneNumber : { name : "somein" , age : "123" , etc......}
    2345678901: {
        "name": "noobest malhotra",
        "age": "28",
        "gender": "male",
        "email": "demo@demo.demo",
        "phone": "2345678901",
        "blood": "A+",
        "cause": "diaorhea",
        "country": "India",
        "state": "Uttar Pradesh",
        "city": "Agra",
     },
     1234567890: {
        "name": "noobie malhotra",
        "age": "24",
        "gender": "male",
        "email": "demoe@demo.demo",
        "phone": "1234567890",
        "blood": "B+",
        "cause": "diaorhea",
        "country": "India",
        "state": "Uttar Pradesh",
        "city": "Agra",
     },
     4567890123 : {
        "name": "noob malhotra",
        "age": "28",
        "gender": "male",
        "email": "demo@demo.demo",
        "phone": "4567890123",
        "blood": "A+",
        "address": "some thing",
        "country": "India",
        "state": "Uttar Pradesh",
        "city": "Agra"
    }
}

let DATABASE8 ={
    // donor phonenumber : receipent phonenumber
    2345678901:4567890123
}

let DATABASE7 = {
    // phone : uniqueID
    // 1234567890: 13462244509
}

function apiKeyVerify(key) {
    for (let [ph, token] of Object.entries(DATABASE)) {
        if (key == token)
            return ph;
    }
    console.log("f2");
    return false;
}

function completeRequest(pn){
    for(let don in DATABASE8){
        if(DATABASE8[don]==pn)
        delete DATABASE8[don];
    }
    for(let req in DATABASE6){
        if(req==pn)
        delete DATABASE6[req];
    }
}

function requestExist(pn){
    return DATABASE6.hasOwnProperty(pn);
}

function donorExist(pn){
    return DATABASE5.hasOwnProperty(pn);
}

function setDonate(don,rec){
    DATABASE8[don]=rec;
}

function getDonor(pn){
    let result=[];
    for(let don in DATABASE8)
    {
        console.log(DATABASE8[don],pn);
        if(DATABASE8[don]==pn)
        {
            result.push(getDonateDetail(don));
        }
    }
    return result;
}

function getDonateStatus(pn) {
    if (pn in DATABASE3)
        return DATABASE3[pn];
    DATABASE3[pn] = false;
    return DATABASE3[pn];
}

function getRequestStatus(pn) {
    if (pn in DATABASE4)
        return DATABASE4[pn];
    DATABASE4[pn] = false;
    return DATABASE4[pn];
}

function getDonateDetail(pn){
    if(pn in DATABASE5)
    return DATABASE5[pn];
    return false;
}

function getRequestDetail(pn){
    if(pn in DATABASE6)
    return DATABASE6[pn];
    return false;
}

function setDonateDetail(pn, data) {
    DATABASE5[pn] = data;
    // console.log(DATABASE5[pn]);
}
function setRequestDetail(pm, data) {
    DATABASE6[pm] = data;
}

function createNewOTP(pn) {
    let OTP = "", len = 6;
    for (let i = 0; i < len; i++)
        OTP += Math.floor((Math.random() * 100) % 10);
    DATABASE2[pn] = OTP;
    console.log(DATABASE2)
    return OTP;
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

function validDonorCount(data) {
    
    let ct=0;
    for(let pn in DATABASE5)
    {
        let bo = 1;
        for (let key in data) 
        {
            // console.log(DATABASE5[pn][key]);
            if(DATABASE5[pn][key]!==data[key])
            {
                bo = 0;
                break;
            }
        }
    if (bo == 1)
        ct++;
    }
    return ct;
}

function findRequest(city){
    let resuult = []
    for (let pn in DATABASE6){
        let detail = DATABASE6[pn]
        if (detail.city === city){
            resuult.push(detail)
        }
    }
    return resuult;
}

module.exports = {
    isValidPhone,
    phoneToToken,
    createNewOTP,
    checkOTP,
    createNewApiToken,
    findRequest,
    validDonorCount,
    apiKeyVerify,
    getDonateStatus,
    getRequestStatus,
    getRequestDetail,
    getDonateDetail,
    setDonateDetail,
    setRequestDetail,
    requestExist,
    setDonate,
    getDonor,
    donorExist,
    completeRequest
};



// Unicorn Easter Egg
// 🦄🦄🦄🦄🦄🦄