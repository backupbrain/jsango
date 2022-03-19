class Dbrms {
    constructor (table) {
        this.method = ''
        this.table = table
        this.conditions = {}
        this.limit = 0
        this.offset = null
    }

    get ({}) {

    }

    execute () {
        // SELECT * FROM `table` where (conditions) limit 0, offset 0
        let conditionsList = []
        Object.keys(this.conditions).forEach(key => {
            const value = this.conditions[key]
            conditionsList.push(`${key} = ${value}`)
        })
        const conditions = conditionsList.join(' AND ')
        let query = `${this.method} * FROM ${this.table} WHERE ${conditions}`
        const result = await db.execute(query)
        return result
    }


}

// User extends Models
// Models has static method get()
// User.get({ email: 'soricine@gmail.com' })
// return one object
class Models {
    // conditions = {email: 'soricine@gmail.com'}
    static async get(conditions) {
        const tableName = this.class.name.toLowerCase()
        const dbrms = new Dbrms(tableName)
        dbrms.conditions = conditions
        const matchingRow = dbrms.execute()
        // matchingRow = {email: christofer@gmail.com, name: Christofer}
        // convert to User object:
        const model = createClass(this.class.name)
        Object.keys(matchingRow).forEach(propertyName => {
            const propertyName = matchingRow[key]
            model[propertyName] = value
        })
        // User(email=soricine@gmail.com, name=Christofer)
        return model
    }
}