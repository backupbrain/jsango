import response from '../server.js'
import User from './models.js'
import View from './djangoClassViews'

function aboutMethod (request) {
    const user = await User.get({ email: 'soricine@gmail.com' })
    const context = { 'name': user.name }
    return response(request, 'about.html', context)
}


class AboutClass extends View {
    get (request) {
        const user = await User.get({ email: 'soricine@gmail.com' })
        const context = { 'name': user.name }
        return response(request, 'about.html', context)
    }
}
