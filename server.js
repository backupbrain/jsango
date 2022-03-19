import httpServer from 'httpServerNpmModule'


class Response {
    constructor (status, headers, body) {
        this.status = status,
        this.headers = headers,
        this.body = body
    }
}

function response (request, templateFilename, context) {
    let templateText = openFile(`templates/${appName}/${templateFilename}`)
    Object.keys(context).forEach(key => {
        value = context[key]
        templateText.replace(`{${key}}`, value)
    })
    const r = new Response(200, {}, templateText)
    return r
}


// look in these folders for urls
INSTALLED_APPS = [
    'blog'
]

const urls = import('./urls.js')



const httpRequest = {
    method: 'POST'
    headers: {
        'Content-Type': 'text/application'
    },
    body: '{"test":"value}',
}

/* Request:
HTTP 1.1/GET
Content-Type: application/json; encoding=utf-8
Datetime: 23498729487239487

{"test":"value"}
*/

/* Response
HTTP 1.1/200 OK
Content-Type: application/json; encoding=utf-8
Datetime: 23498729487239487

{"test":"value"}
*/

httpServer.start(
    routes = urls.process()
)


/*
/about -> blog/about.js aboutMethod()
*/