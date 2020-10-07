const AbstractUI = require('./AbstractUI')
const { mongooseUtil } = require('../utils/mongooseUtil')
const { Person } = require('../beans/Person')

class FacultyUI extends AbstractUI {
    async getWidget(request, callback) {
        if (request.params.action == "getTopRecords") {
            await this.getTopRecords(request, callback);
        }
        else if (request.params.action == "filterRecord") {
            await this.getTopRecords(request, callback);
        }
        else if (request.params.action == "saveRecord") {
            await this.saveRecord(request, callback);
        }
        else if (request.params.action == "getRecordProfile") {
            await this.getRecordProfile(request, callback);
        }
        else {
            throw new Error(`${request.params.action} not implemented in ${this.constructor.name}`)
        }
    }

    async saveRecord(request, callback) {
        let person = {};
        person.email = request.body.email;
        person.lastName = request.body.lastName;
        person.firstName = request.body.firstName;
        person.middleInitial = request.body.middleInitial;
        person.personType = "Employee";
        person.personSubType = "Faculty";
        person.gender = request.body.gender;
        person.religion = request.body.religion;
        person.phone = request.body.phone;
        person.birthDate = request.body.birthDate;

        await mongooseUtil.saveRecord(Person, { email: request.body.email }, person, function (err, record) {
            if (record != null) {
                callback(record);
            }
            else {
                callback("");
            }
        });
    }

    async getRecordProfile(request, callback) {
        await mongooseUtil.findSingleRecord(Person, { _id: request.params.term1 }, function (err, record) {
            if (record != null) {
                callback(record);
            }
            else {
                callback("");
            }
        });
    }

    async getTopRecords(request, callback) {
        let filter = {};
        filter.personSubType = "Faculty";

        const mainFilter = request.query.mainFilter;
        if (mainFilter != null && mainFilter != "") {
            filter.firstName = { $regex: '.*' + mainFilter + '.*', $options: 'i' };
            filter.lastName = { $regex: '.*' + mainFilter + '.*', $options: 'i' };
        }

        await mongooseUtil.findRecords(Person, filter, "firstName", function (err, records) {
            if (records != null) {
                callback(records);
            }
            else {
                callback("");
            }
        });
    }

    getLeftMenu(user) {
        return {
            groupName: "School",
            group: "School",
            name: "FacultyUI",
            label: "Faculty"
        };
    }
}

const facultyUI = new FacultyUI()
module.exports = facultyUI;
