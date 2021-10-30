console.table(localStorage)

const apikey=localStorage.getItem("APIKEY");
console.log(apikey);

async function errorcatcher(url){
    await fetch(url).then(async response => {
        try {
         const data = await response.json()
         console.log('response data?', data)
       } catch(error) {
         console.log('Error happened here!')
         console.error(error)
       }
      })
}

async function checkDonateStatus(){
    const url=`http://localhost:5000/transferData?apikey=${apikey}&mode=GET&what=donateStatus`;
    let res=await fetch(url);
    res = await res.json();

    if(res.STATUS=='ok')
    {
        if(res.DATA==true)
        {
            window.location.href  = window.location.origin + '/frontend/donordash.html'
        }
        else
        {
            window.location.href  = window.location.origin + '/frontend/donorform.html'
        }
    }
    else
    {
        console.log("failure")
    }
}

async function checkRequestStatus(){
    const url=`http://localhost:5000/transferData?apikey=${apikey}&mode=GET&what=requestStatus`;
    let res=await fetch(url);
    res = await res.json();

    if(res.STATUS=='ok')
    {
        if(res.DATA==true)
        {
            window.location.href  = window.location.origin + '/frontend/requiredash.html'
        }
        else
        {
            window.location.href  = window.location.origin + '/frontend/requireform.html'
        }
    }
    else
    {
        console.log("failure")
    }
}