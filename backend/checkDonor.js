const { IncomingMessage, ServerResponse } = require('http');

// checkDonor?bloodgroup=999&country=india&state=up&city=agra
/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/
function checkDonorAPI(req, res){


    // sanitize params 

    // logic

    let resulJSON = "{STATUS:'ok', MESSAGE: 'working/checkDonor'}"

    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);


}

module.exports = {
    checkDonorAPI
}