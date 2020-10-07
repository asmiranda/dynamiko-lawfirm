const AbstractUI = require('./AbstractUI')
const { mongooseUtil } = require('../utils/mongooseUtil')
const { Person } = require('../beans/Person')
const { SchoolSchedule } = require('../beans/SchoolSchedule')

class SchoolScheduleUI extends AbstractUI {
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

    async getAutoComplete(request, callback) {
        const field = request.params.field;
        if (field == "facultyEmail") {
            let filter = {};
            filter.personSubType = "Faculty";

            const mainFilter = request.params.code;
            if (mainFilter != null && mainFilter != "") {
                filter.firstName = { $regex: '.*' + mainFilter + '.*', $options: 'i' };
                filter.lastName = { $regex: '.*' + mainFilter + '.*', $options: 'i' };
            }

            await mongooseUtil.findRecords(Person, filter, "lastName", function (err, records) {
                if (records != null) {
                    let retRecords = [];
                    records.forEach(record => {
                        let retRecord = {};
                        retRecord.key = record.email;
                        retRecord.value = `${record.lastName}, ${record.firstName}`;
                        retRecords.push(retRecord);
                    });
                    callback(retRecords);
                }
                else {
                    callback("");
                }
            });
        }
        else {
            throw new Error(`AutoComplete for ${field} not implemented in ${this.constructor.name}`)
        }
    }

    async getAutoCompleteLabel(request, callback) {
        const field = request.params.field;
        const code = request.params.code;
        if (field == "facultyEmail") {
            await mongooseUtil.findSingleRecord(Person, { email: code }, function (err, record) {
                if (record != null) {
                    let retVal = {};
                    retVal.key = record.email;
                    retVal.value = `${record.lastName}, ${record.firstName}`;
                    retVal.fieldName = field;
                    callback(retVal);
                }
                else {
                    callback("");
                }
            });
        }
        else {
            throw new Error(`AutoCompleteLabel for ${field} not implemented in ${this.constructor.name}`)
        }
    }

    async saveRecord(request, callback) {
        let schedule = {};
        schedule.facultyEmail = request.body.facultyEmail;
        schedule.section = request.body.section;
        schedule.subject = request.body.subject;
        schedule.time = request.body.time;

        await mongooseUtil.saveRecord(SchoolSchedule, { section: request.body.section, subject: request.body.subject }, schedule, function (err, record) {
            if (record != null) {
                callback(record);
            }
            else {
                callback("");
            }
        });
    }

    async getRecordProfile(request, callback) {
        await mongooseUtil.findSingleRecord(SchoolSchedule, { _id: request.params.term1 }, function (err, record) {
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

        const mainFilter = request.query.mainFilter;
        if (mainFilter != null && mainFilter != "") {
            filter.facultyEmail = { $regex: '.*' + mainFilter + '.*', $options: 'i' };
            filter.section = { $regex: '.*' + mainFilter + '.*', $options: 'i' };
            filter.subject = { $regex: '.*' + mainFilter + '.*', $options: 'i' };
            filter.subjectName = { $regex: '.*' + mainFilter + '.*', $options: 'i' };
            filter.time = { $regex: '.*' + mainFilter + '.*', $options: 'i' };
        }

        await mongooseUtil.findRecords(SchoolSchedule, filter, "type", function (err, records) {
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
            name: "SchoolScheduleUI",
            label: "Schedule"
        };
    }
}

const schoolScheduleUI = new SchoolScheduleUI()
module.exports = schoolScheduleUI;
