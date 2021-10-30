let donors=[
    {
        "name":"noob malhotra",
        "age":"28",
        "gender":"male",
        "email":"demo@demo.demo",
        "phone":"9876543210",
        "blood":"A+",
        "address":"12-A",
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
        "address":"12-A",
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
        "address":"12-A",
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
        "address":"12-A",
        "country":"India",
        "state":"uttar pradesh",
        "city":"agra",
        "key":"someRandomHashKey"
    }
]; // fakedata ; to be later replaced by fetch api

// donors=[];

const space=document.getElementById("space");

if(donors.length==0)
{
    space.innerHTML=`<div class="item">We have not found a suitable donor for your requirement.</div>`;
}
else
{
    let html="";
    donors.forEach((data)=>{
        let donor=`<div class="item">
        ${data.name},${data.age} yrs (+91${data.phone}) wants to donate ${data.blood} 
        blood to you.
        <button onclick="location.href='API/require/${data.key}'">Accept</button> 
        </div>`;
        html+=donor;
    })
    space.innerHTML=html;
}