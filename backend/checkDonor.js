const { IncomingMessage, ServerResponse } = require('http');
const {getParams} = require('./getParams');
// checkDonor?bloodgroup=999&country=india&state=up&city=agra
/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/

const bloodGroups=['A+','A-','B+','B-','O+','O-','AB+','AB-'];
const auth_token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJjb2FzdGFsZGVtaWdvZEBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJxYjJfbHVxTWo3YWgxMmNuQkFodV9Gb2FTTmFTSFVkY09sX043bUR4bTVwUHRyYnRMZC1kLXpfNklmeklZT1ZpWDlVIn0sImV4cCI6MTYzNTYyMTIwMX0.MUoXUzwaNVBt5iJNbySf_qv4Li8r_AtZRREyMtkI-A8";
let countries_url="https://www.universal-tutorial.com/api/countries/";
let states_url="https://www.universal-tutorial.com/api/states/";
let city_url="https://www.universal-tutorial.com/api/cities/"

const param={
    headers:{
        "content-type":"application/json",
        "Authorization":auth_token
    },
    method:"GET"
};
async function getdata(url,param){

    const res = await fetch(url,param);
    return await res.json();
}

async function checkCountry(country){
    let codata=await getdata(countries_url,param);
    codata = codata.filter(dt => dt.country_name);
    if(codata.includes(country))
    return 1;
    else
    return 0;
}

async function checkState(state,country){
    let sdata=await getdata(states_url+country,param);
    sdata = sdata.filter(dt => dt.state_name);
    if(sdata.includes(state))
    return 1;
    else
    return 0;
}

async function checkCity(city,state){
    let cidata=await getdata(city_url+state,param);
    cidata = cidata.filter(dt => dt.city_name);
    if(cidata.includes(city))
    return 1;
    else
    return 0;
}

function checkDonorAPI(req, res){

    // sanitize params
    console.log(req.url);
    console.log(getParams(req.url,['blood','country','state','city']));
    // const data=sanitize(req.url);
    let bad=0;
    // if(bloodGroups.includes(data.blood) && (checkCountry(data.country) && checkState(data.state,data.country) && checkCity(data.city,data.state)))
    {

    }
        
    // let resulJSON = "{STATUS:'ok', MESSAGE: 'Invalid Request'}"
    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(resulJSON);
    //logic
    let resulJSON = '{"STATUS":"ok", "MESSAGE": "working/checkDonor"}';

    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);

}

module.exports = {
    checkDonorAPI
}