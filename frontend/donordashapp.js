const apikey=localStorage.getItem("APIKEY");
console.log(apikey);

async function makeRequest(url){
    const res=await fetch(url);
    return await res.json();
}

async function getDashboardDetail(){
    const url=`http://localhost:5000/dashBoardDetail?apikey=${apikey}&what=donor`;
    const res=await makeRequest(url);
    console.log("omg");
    if(res.STATUS=='ok')
    {
        console.log(res.DATA);
        let patients=[];
        patients=JSON.parse(res.DATA.replace(/\'/g,"\""));
        console.log(patients);
        
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
                <button onclick="location.href='http://localhost:5000/donate?apikey=${apikey}&recphone=${data.phone}'">Donate</button> 
                </div>`;
                html+=patient;
            })
            space.innerHTML=html;
        }
    }
}

async function setname(){
    const nm=document.getElementById("name");
    const url = `http://localhost:5000/transferData?apikey=${apikey}&mode=GET&what=donateDetail`;
    const res=await makeRequest(url);
    if(res.STATUS=='ok')
    {
        let obj = JSON.parse(res.DATA.replace(/\'/g,"\""));
        nm.innerHTML=obj["name"];
    }
}

setname();
getDashboardDetail();