let patients=[
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
]; // fakedata ; to be later replaced by fetch api

// patients=[];

const space=document.getElementById("space");

if(patients.length==0)
{
    space.innerHTML=`<div class="item">There are no patients in your area, who require blood/blood components.</div>`;
}
else
{
    let html="";
    patients.forEach((data)=>{
        let patient=`<div class="item">
        ${data.name},${data.age} yrs (+91${data.phone}) needs ${data.blood} 
        blood for ${data.cause} in ${data.city},${data.state}.
        <button onclick="location.href='API/donate/${data.key}'">Donate</button> 
        </div>`;
        html+=patient;
    })
    space.innerHTML=html;
}