const { QueryTypes } = require('sequelize');
const dbUtil = require('../utils/dbUtil')
const AbstractUI = require('./AbstractUI')

class PersonUI extends AbstractUI {
    async getWidget(request, callback) {
        if (request.params.action == "getProfile") {
            await this.getProfile(request, callback);
        }
        else {
            throw new Error(`${request.params.action} not implemented in ${this.constructor.name}`)
        }
    }

    async getProfile(request, callback) {
        const username = request.user.username;
        const sequelize = await dbUtil.getConnection();
        const person = await sequelize.query(`select * from Person where email='${username}'`, { type: QueryTypes.SELECT });
        callback(person[0]);
    }
}

const personUI = new PersonUI()
module.exports = personUI;
