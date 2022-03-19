const { response } = require('../jsango-core/response')
const { User } = require('./models')
const { View } = require('../jsango-core/View')

class AboutClass extends View {
    
    get templateFilename () { return 'about.html' }

    async get (request) {
        const user = await User.get({ email: 'email@example.com' })
        const context = this.getContextData()
        context['name'] = user.name
        return response(request, 'about.html', context)
    }
}

exports.AboutClass = AboutClass
