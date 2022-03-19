urls = [
    { path: '/', file: 'index.js' }
]

INSTALLED_APPS.forEach(installedApp => {
    urls += import(`${installedApp}/urls.js`)
})

