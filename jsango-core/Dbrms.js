const fs = require('fs').promises
class Dbrms {
    constructor (table) {
        this.method = ''
        this.table = table
        this.conditions = {}
        this.limit = 0
        this.offset = null
    }

    async execute () {
        // ok so here instead of using SQL, we are just
        // loading JSON from a text file
        const fileName = `dummy-${this.table}-database.json`
        const textData = await fs.readFile(fileName, 'utf-8')
        const data = JSON.parse(textData)
        // loop through dummy data and look for conditions
        const matches = []
        for (let row = 0; row < data.length; row++) {
            const dataRow = data[row]
            let isMatch = true
            Object.keys(this.conditions).forEach(key => {
                const value = this.conditions[key]
                if (dataRow[key] !== value) {
                    isMatch = false
                }
            })
            if (isMatch === true) {
                matches.push(dataRow)
                if (matches.length > this.limit) {
                    break
                }
            }
        }
        return matches
        /*
        // here's roughly how this would look with SQL
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
        /* */
    }


}
exports.Dbrms = Dbrms
