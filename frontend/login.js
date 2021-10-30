async function doSomething(){
    let phone = document.getElementById('phone').value;
    let status = document.getElementById('loginStatus')

    status.innerText = 'Loading....'

    let x = await fetch('http://localhost:5000/login?phonenumber=' + phone)
    x = await x.json()

    status.innerText = x.MESSAGE

    if ( x.STATUS == 'ok'){
        document.getElementById('otp').disabled = false
        document.getElementById('otpBtn').disabled = false
        document.getElementById('phone').disabled = true
        document.getElementById('phoneBtn').disabled = true
    }

}

async function doAgain(){    
    let phone = document.getElementById('phone').value;
    let otp = document.getElementById('otp').value;
    let status = document.getElementById('otpStatus')

    status.innerText = 'Checking....'

    let x = await fetch('http://localhost:5000/otpVerification?phonenumber=' + phone + '&otp=' + otp)
    x = await x.json()

    status.innerText = x.MESSAGE

    if (x.STATUS == 'ok'){

        localStorage.setItem('APIKEY', x.APIKEY) 
        window.location.href  = window.location.origin + '/frontend/dashboard.html'

    }

}