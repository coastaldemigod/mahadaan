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

const emailreg= /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
const phonereg=/^\d{10}$/;
const agereg = /^\d{2}$/;

const keys = document.querySelectorAll("input");
// console.log(keys);
const age=keys[1];
const email=keys[2];
const phone=keys[3];

phone.addEventListener('keyup',val=>{ 
    // console.log(val.target.value);
    phonereg.test(val.target.value) ? val.target.className="valid" : val.target.className="invalid";
    // console.log(val.target);
});

email.addEventListener('keyup',val=>{
    emailreg.test(val.target.value) ? val.target.className="valid" : val.target.className="invalid";
});

age.addEventListener('keyup',val=>{
    agereg.test(val.target.value) && val.target.value>=18 && val.target.value<=65 ? val.target.className="valid" : val.target.className="invalid";
})

async function makeRequest(url){
    const res=await fetch(url);
    return await res.json();
}

const apikey=localStorage.getItem("APIKEY");
console.log(apikey);

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(e.target);
    let data=Object.fromEntries(formData.entries());
    console.log(data);
    data=JSON.stringify(data) // KNOWN BUG : blood group is not sent as wanted.
    let url = `http://localhost:5000/transferData?apikey=${apikey}&mode=POST&what=donateDetail&whatData=${data}`;
    const res = await makeRequest(url);
    if(res.STATUS=='ok')
    {
        window.location.href  = window.location.origin + '/frontend/donordash.html'
    }
  });

async function onloader(){
    let url = `http://localhost:5000/transferData?apikey=${apikey}&mode=GET&what=donateDetail`;
    const res= await makeRequest(url);
    if(res.STATUS=='ok')
    {
        const form = document.getElementById('form_id');
        const formData = new FormData(form);
        let data=Object.fromEntries(formData.entries());
        console.log(data);
        // console.log(res.DATA);
        let obj = JSON.parse(res.DATA.replace(/\'/g,"\""));
        console.log(obj);
        for( let [key,val] of Object.entries(obj)){

            console.log(key,obj[key]);
            document.getElementById(key).value=obj[key];
        }
        let opt = document.createElement('option');
        opt.value = obj["country"];
        opt.innerHTML = obj["country"];
        document.getElementById("country").appendChild(opt);
        opt = document.createElement('option');
        opt.value = obj["state"];
        opt.innerHTML = obj["state"];
        document.getElementById("state").appendChild(opt);
        opt = document.createElement('option');
        opt.value = obj["city"];
        opt.innerHTML = obj["city"];
        document.getElementById("city").appendChild(opt);

        // Known bug : country,state,city do not change after setting the values via the above method.

    }
    else
    {
        setCountry();
    }
}

  window.onload=onloader;