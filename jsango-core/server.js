const http = require('http')
const { notFoundTemplateFile, methodNotAllowedTemplateFile } = require('../system/settings')
const { findPathHandler } = require('./urlRouter')
const TemplateReader = require('./TemplateReader')
const { response } = require('./response')

/**
 * A Django-compatible Request object
 */
class JsangoRequest {
    constructor (req, httpBody, pathInfo) {
        this.method = req.method
        this.headers = this._loadHeaders(req.rawHeaders)
        const pathComponents = this._getPathComponents(req.url)
        this.path = pathComponents.path
        this.queryParameters = pathComponents.queryParameters
        this.httpBody = httpBody
        this.pathInfo = pathInfo
    }

    /**
     * Load Headers from the nodejs http request.rawHeaders
     */
    _loadHeaders (rawHeaders) {
        const headers = {}
        let key = null
        // the request.rawHeaders is a flat array,
        // with [key, value, key, value] array items corresponding
        // to {key = value, key = value} headers
        rawHeaders.forEach(value => {
            if (key) {
                headers[key] = value
                key = null
            } else {
                key = value
            }
        })
        return headers
    }

    /**
     * Paths might include query strings (?key=value)
     * so we need to remove those and store them as a separate
     * variable set
     */
    _getPathComponents (path) {
        let remainingPath = path
        const pathComponents = {
            path: '',
            queryParameters: {}
        }
        const queryBegin = path.indexOf('?')
        // convert query parameters from url-encoded string
        // to an object
        if (queryBegin >= 0) {
            const queryString = path.substring(queryBegin + 1)
            const queryStringParts = queryString.split('&')
            const queryParameters = {}
            queryStringParts.forEach(queryStringPart => {
                const keyValuePair = queryStringPart.split('=')
                const key = decodeURI(keyValuePair[0])
                const value = decodeURI(keyValuePair[1])
                queryParameters[key] = value
            })
            pathComponents.queryParameters = queryParameters
            remainingPath = remainingPath.substring(0, queryBegin)
        }
        pathComponents.path = remainingPath
        return pathComponents
    }
}

const logResponseToConsole = (jsangoRequest, jsangoResponse) => {
    const dateTime = new Date()
    const byteLength = Buffer.byteLength(jsangoResponse.body, 'utf8')
    console.log(`[${dateTime.toLocaleString()}] "${jsangoRequest.method} ${jsangoRequest.path}" ${jsangoResponse.status} ${byteLength}`)
}

const jsangoHttpServer = http.createServer(async (req, res) => {
    // In Javascript's HTTP library, HTTP message bodies
    // can be streamed in chunks, so we need to 
    // read each chunk to get the whole HTTP message
    let httpBody = ''
    req.on('data', chunk => {
        httpBody += chunk;
    })
    // once the client finishes sending data, we can process
    req.on('end', async () => {
        const jsangoRequest = new JsangoRequest(req, httpBody, null)
        // let's see if we can map the URLs from here.
        const pathInfo = findPathHandler(jsangoRequest)
        if (pathInfo === null) {
            // handle 404 not found
            const jsangoResponse = await response(jsangoRequest, notFoundTemplateFile, {})
            jsangoResponse.status = 404
            jsangoResponse.headers = {}
            res.writeHead(jsangoResponse.status, jsangoResponse.headers)
            res.end(jsangoResponse.body)
            logResponseToConsole(jsangoRequest, jsangoResponse)
        } else {
            // set the path info (especially the app name)
            // so that we can locate the template files from the
            // app's view
            jsangoRequest.pathInfo = pathInfo
            const method = jsangoRequest.method.toLowerCase()
            // pathInfo[1] should be the View class
            // pathInfo[1][method] will be the .get() or .post()
            // method
            const viewModel = new pathInfo[1]()
            if (viewModel[method] !== undefined) {
                // dynamically call this method
                const jsangoResponse = await viewModel[method](jsangoRequest)
                // send the result to the client
                res.writeHead(jsangoResponse.status, jsangoResponse.headers)
                res.end(jsangoResponse.body)
                logResponseToConsole(jsangoRequest, jsangoResponse)
            } else {
                const jsangoResponse = await response(req, methodNotAllowedTemplateFile, {})
                jsangoResponse.status = 405
                jsangoResponse.headers = {}
                res.writeHead(jsangoResponse.status, jsangoResponse.headers)
                res.end(jsangoResponse.body)
                logResponseToConsole(jsangoRequest, jsangoResponse)
            }
        }
    })
})

exports.jsangoHttpServer = jsangoHttpServer
