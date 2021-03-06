let countries_url="https://www.universal-tutorial.com/api/countries/";
let states_url="https://www.universal-tutorial.com/api/states/";
let city_url="https://www.universal-tutorial.com/api/cities/"
// the auth_token gets changed every 24 hours, and must be changed.
const auth_token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJjb2FzdGFsZGVtaWdvZEBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJxYjJfbHVxTWo3YWgxMmNuQkFodV9Gb2FTTmFTSFVkY09sX043bUR4bTVwUHRyYnRMZC1kLXpfNklmeklZT1ZpWDlVIn0sImV4cCI6MTYzNTcxNDI0MH0.YeRUWu-jtq2SvezIzsBRwumehe5Ff48g5EfJNPCab0w";

const param2={
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

async function setCountry(){
       const data = await getdata(countries_url,param2);
    //    console.log(typeof(data)); 
    //    console.log(data[0].country_name);
        let html="";
        data.forEach(ele => {
            let country=`<option value="${ele.country_name}">${ele.country_name}</option>`;
            html+=country;
        });
        let countrydrop=document.getElementById("country");
        countrydrop.innerHTML=html;
        let statedrop=document.getElementById("state");
        statedrop.innerHTML=`<option value="some state">some state</option>`;
        let citydrop=document.getElementById("city");
        citydrop.innerHTML=`<option value="some city">some city</option>`;
}

async function setState(){

    let country=document.getElementById("country").value;
    console.log(country);
    let url = states_url + country;
    console.log(url);
    const data = await getdata(url,param2);
    let html="";
        data.forEach(ele => {
            let state=`<option value="${ele.state_name}">${ele.state_name}</option>`;
            html+=state;
        });
        let statedrop=document.getElementById("state");
        statedrop.innerHTML=html;
        let citydrop=document.getElementById("city");
        citydrop.innerHTML=`<option value="some city">some city</option>`;
}

async function setCity(){

    let state=document.getElementById("state").value;
    console.log(state);
    let url = city_url + state;
    console.log(url);
    const data = await getdata(url,param2);
    let html="";
        data.forEach(ele => {
            let city=`<option value="${ele.city_name}">${ele.city_name}</option>`;
            html+=city;
        });
        let citydrop=document.getElementById("city");
        citydrop.innerHTML=html;
}

setCountry();

async function postData(url,data){
    const response = await fetch(url,{
    method:"POST",
    mode:"no-cors",
    headers:{
        "content-type":"application/json",
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true
    },
    body:JSON.stringify(data)
    });
    return response.json();
}

function showDonor()
{
    const blood=encodeURIComponent(document.getElementById("blood").value);
    const country=document.getElementById("country").value;
    const state=document.getElementById("state").value;
    const city=document.getElementById("city").value;
    const data={
        "blood":blood,
        "country":country,
        "state":state,
        "city":city
    };
    let url=encodeURI(`http://localhost:5000/checkDonor?blood=${blood}&country=${country}&state=${state}&city=${city}`);
    // console.log(url);
    fetch(url)
    .then(e=>e.json())
    .then(dt=>{
        alert(`There is/are ${dt.DATA} donors available who can donate blood to you.`);
    });
}