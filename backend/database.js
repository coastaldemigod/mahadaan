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
        "blood":"B+",
        "cause":"diaorhea",
        "country":"India",
        "state":"Uttar pradesh",
        "city":"Agra",
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
        "state":"Uttar Pradesh",
        "city":"Agra",
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
    return donordata.filter((dt)=>{
        let bo=1;
        for(let [key,value] of Object.entries(data))
        {
            if(dt[key]!=value)
            {
                bo=0;
                break;
            }
        }
        if(bo==1)
        return true;
        else
        return false;
    }).length;
}

module.exports = { isValidPhone, phoneToToken, createNewOTP ,validDonorCount}