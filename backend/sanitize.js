/**
 * pn = string or number
 * return string (phone Number ) if valid
 * else null
*/
function sanitizePhone(pn) {
    pn = String(pn)
    const phonereg = /^\d{10}$/;
    return phonereg.test(pn) ? ph : null;
}

module.exports = { sanitizePhone }