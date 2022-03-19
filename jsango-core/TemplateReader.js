fs = require('fs').promises

class TemplateReader {
    constructor (filename) {
        this.filename = filename
        this.content = ''
    }

    async openFile () {
        const content = await fs.readFile(this.filename, 'utf8')
        this.content = content
    }

    replace (context) {
        Object.keys(context).forEach(key => {
            const value = context[key]
            this.content = this.content.replace(`{${key}}`, value)
        })
    }
}

exports.TemplateReader = TemplateReader