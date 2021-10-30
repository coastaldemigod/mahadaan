/**
 * To Extract params from a URL 
 * url = string
 * paramList = list of string 
 * return object , value may be null if not found
*/

function getParams(url, paramList) {

    let result = {};
    for (let i of paramList) result[i] = null

    url = url.split('?')
    if (url.length == 1)
        return result
    else url = url[1]

    let searcher = new URLSearchParams(url)

    for (let p of paramList) {
        if (searcher.has(p))
            result[p] = searcher.get(p)
    }

    return result
}

module.exports = { getParams }