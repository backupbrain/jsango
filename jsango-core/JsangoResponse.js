
class JsangoResponse {
    constructor (status, headers, body) {
        this.status = status,
        this.headers = headers,
        this.body = body
    }
}

exports.JsangoResponse = JsangoResponse
