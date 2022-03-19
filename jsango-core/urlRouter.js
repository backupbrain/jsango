const { urls } = require('../system/urls')

const findPathHandler = (jsangoRequest) => {
    // loop through urls and try to find a matching path
    // paths may use regular expressions, so this part is a little
    // tricky
    const path = jsangoRequest.path
    for (let i = 0; i < urls.length; i++) {
        const urlInfo = urls[i]
        // It's common for us to look up objects by id
        // so if we convert "<id>" to a numeric regular expression
        // then we can search for a matching regular expression
        // in the URL path
        const possiblyMatchingUrl = urlInfo[0]
        const urlRegexString = possiblyMatchingUrl.replace('<id>', '([0-9]+)').replace('/', '\/')
        const urlRegex = new RegExp(`^${urlRegexString}$`)
        if (path.match(urlRegex)) {
            return urlInfo
        }
    }
    return null
}

exports.findPathHandler = findPathHandler