const { INSTALLED_APPS } = require('./settings')

const urls = [
]

INSTALLED_APPS.forEach(installedApp => {
    let localUrls = require(`../${installedApp}/urls`)
    localUrls.default.forEach(localUrl => {
        // save the appName to the path information
        // this will me important when trying to determine
        // the path of the template file for that view
        localUrl.push(installedApp)
        urls.push(localUrl)
    })
})

exports.urls = urls
