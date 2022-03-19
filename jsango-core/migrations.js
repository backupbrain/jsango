

function makeMigrations () {
    INSTALLED_APPS.forEach(appName => {
        // 'blog'
        // import the file `blog/models.js`
        const importedModels = import(`${appName}/models.js`)
        // [User, ....]
        importedModels.forEach(model => {
            // User
            Object.keys(model)
            // [email, name]
            // compare to previous version of SQL
            // create list of changes
        })

    })
}

function migrate () {
    // opens the migration folder
    // exports the latest migration to SQL
}