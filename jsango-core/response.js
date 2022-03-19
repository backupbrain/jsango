const { TemplateReader } = require('./TemplateReader')
const { JsangoResponse } = require('./JsangoResponse')

const response = async (request, templateFilename, context) => {
    let fullTemplateFilename = templateFilename
    if (request.pathInfo) {
        fullTemplateFilename = `${request.pathInfo[2]}/templates/${request.pathInfo[2]}/${templateFilename}`
    }
    const template = new TemplateReader(fullTemplateFilename)
    await template.openFile()
    template.replace(context)
    const responseHeaders = {}
    const jsangoResponse = new JsangoResponse(
        200,
        responseHeaders,
        template.content
    )
    return jsangoResponse
}

exports.response = response