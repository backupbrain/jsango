const { jsangoHttpServer } = require('./jsango-core/server')
const DEFAULT_PORT = 8000

const doRunServer = (arguments) => {
    let port = DEFAULT_PORT
    if (arguments[0]) {
        port = arguments[0]
    }

    jsangoHttpServer.listen(port)
    console.log(`JSango web server at port ${port} is running..`)
}

const doMakeDatabaseMigrations = () => {
    // TODO: making migrations
}

const doMigrateDatabase = () => {
    // TODO: database migrations
}

// process command-line arguments
const arguments = process.argv.slice(2)

if (arguments.length == 0) {
    console.error('Must provide arguments.')
} else {
    const mainArgument = arguments.shift()
    switch (mainArgument) {
        case 'runserver':
            doRunServer(arguments)
        break;
        case 'makemigrations':
            doMakeDatabaseMigrations()
        break;
        case 'migrate':
            doMigrateDatabase()
        break;
        default:
            console.error('Invalid argument provided.')
    }
}
