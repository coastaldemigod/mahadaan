const apikey=localStorage.getItem("APIKEY");
console.log(apikey);

async function makeRequest(url){
    const res=await fetch(url);
    return await res.json();
}

async function getDashboardDetail(){
    const url=`http://localhost:5000/dashBoardDetail?apikey=${apikey}&what=recipient`;
    const res=await makeRequest(url);
    console.log("omg");
    if(res.STATUS=='ok')
    {
        console.log(res.DATA);
        let donors=[];
        donors=JSON.parse(res.DATA.replace(/\'/g,"\""));
        console.log(donors);
        
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
                <button onclick="location.href='http://localhost:5000/accept?apikey=${apikey}&donphone=${data.phone}'">Accept</button> 
                </div>`;
                html+=donor;
            })
            space.innerHTML=html;
        }
    }
}

async function setname(){
    const nm=document.getElementById("name");
    const url = `http://localhost:5000/transferData?apikey=${apikey}&mode=GET&what=requestDetail`;
    const res=await makeRequest(url);
    if(res.STATUS=='ok')
    {
        let obj = JSON.parse(res.DATA.replace(/\'/g,"\""));
        nm.innerHTML=obj["name"];
    }
}

setname();
getDashboardDetail();