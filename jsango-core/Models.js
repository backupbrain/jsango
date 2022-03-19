const { Dbrms } = require('./Dbrms')



class Models {

    static DoesNotExistError (className) {
        this.message = `No matching ${className} could be found`
        this.toString = function() {
            return this.message
        }
    }

    static getClassName () {
        return this.toString().split ('(' || /s+/)[0].split (' ' || /s+/)[1];
    }

    static async get(conditions) {
        const className = this.getClassName()
        const tableName = className.toLowerCase()
        const dbrms = new Dbrms(tableName)
        dbrms.conditions = conditions
        dbrms.limit = 1
        const matchingRows = await dbrms.execute()
        if (matchingRows.length == 0) {
            throw new Models.DoesNotExistError(className);
        } else {
            const matchingRow = matchingRows[0]
            const model = {} // eval(`new ${className}()`)
            Object.keys(matchingRow).forEach(propertyName => {
                const value = matchingRow[propertyName]
                model[propertyName] = value
            })
            return model
        }
    }
}

exports.Models = Models