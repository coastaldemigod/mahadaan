const { IncomingMessage, ServerResponse } = require('http');


// login?phonenumber=99898989898
/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * 
*/
function loginAPI(req, res) {

    // sanitize params 

    // logic

    let resulJSON = "{STATUS:'ok', MESSAGE: 'working/login'}"

    res.writeHead(200, { "content-type": "application/json" });
    res.end(resulJSON);

}

module.exports = { loginAPI }