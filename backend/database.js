let DATABASE = {
    // phoneNumber : ApiToken
    '969696': 'AFjdJdsafH3las145823902afd'
}

function isValidPhone(pn) {
    return DATABASE[pn] != undefined;
}

function phoneToToken(pn) {
    return DATABASE[pn];
}

module.exports = { isValidPhone, phoneToToken }
