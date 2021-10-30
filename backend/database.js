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

const donordata=[
    {
        "name":"noob malhotra",
        "age":"28",
        "gender":"male",
        "email":"demo@demo.demo",
        "phone":"9876543210",
        "blood":"A+",
        "cause":"diaorhea",
        "country":"India",
        "state":"uttar pradesh",
        "city":"agra",
        "key":"someRandomHashKey"
    },
    {
        "name":"noob malhotra",
        "age":"28",
        "gender":"male",
        "email":"demo@demo.demo",
        "phone":"9876543210",
        "blood":"A+",
        "cause":"diaorhea",
        "country":"India",
        "state":"uttar pradesh",
        "city":"agra",
        "key":"someRandomHashKey"
    },
    {
        "name":"noob malhotra",
        "age":"28",
        "gender":"male",
        "email":"demo@demo.demo",
        "phone":"9876543210",
        "blood":"A+",
        "cause":"diaorhea",
        "country":"India",
        "state":"uttar pradesh",
        "city":"agra",
        "key":"someRandomHashKey"
    },
    {
        "name":"noob malhotra",
        "age":"28",
        "gender":"male",
        "email":"demo@demo.demo",
        "phone":"9876543210",
        "blood":"A+",
        "cause":"diaorhea",
        "country":"India",
        "state":"uttar pradesh",
        "city":"agra",
        "key":"someRandomHashKey"
    }
];

function validDonorCount(data){
    return donordata.filter(()=>{
        
    }).length;
}

module.exports = { isValidPhone, phoneToToken, createNewOTP }