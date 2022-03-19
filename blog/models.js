const { Models } = require('../jsango-core/Models')

class User extends Models {
    constructor () {
        this.name = ''
        this.email = ''
    }

    // static async get()
}

exports.User = User
