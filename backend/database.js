const crypt = require('crypto');

let DATABASE = {
    // phoneNumber : ApiToken
    1234:"somerandomkey",
    2345:"somerandomkey"
}
let DATABASE2 = {
    // phonenumber : otp
}

let DATABASE3 ={
    // phoneNumber : donateStatus
    1234:"true"
}

let DATABASE4 ={
    // phoneNumber : requestStatus
}

let DATABASE5 ={
    // for DONOR
    // phoneNumber : { name : "somein" , age : "123" , etc......}
}

let DATABASE6 ={
    // for Request
    // phoneNumber : { name : "somein" , age : "123" , etc......}
    1234 : {
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
}

function apiKeyVerify(key){
    for(let [ph,token] of Object.entries(DATABASE))
    {
        if(key==token)
        return ph;
    }
    return false;
}

function getDonateStatus(pn){
    if(pn in DATABASE3)
    return DATABASE3[pn];
    DATABASE3[pn]=false;
    return DATABASE3[pn];
}

function getRequestStatus(pn){
    if(pn in DATABASE4)
    return DATABASE4[pn];
    DATABASE4[pn]=false;
    return DATABASE4[pn];
}

function getDonateDetail(pn){
    return DATABASE5[pn];
}

function getRequestDetail(pn){
    return DATABASE6[pn];
}

function setDonateDetail(pn,data){
    DATABASE5[pn]=data;
    // console.log(DATABASE5[pn]);
}
function setRequestDetail(pm,data){
    DATABASE6[pm]=data;
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

module.exports = { isValidPhone, phoneToToken, createNewOTP, checkOTP, createNewApiToken, validDonorCount , apiKeyVerify, getDonateStatus,getRequestStatus,getRequestDetail,getDonateDetail,setDonateDetail,setRequestDetail};