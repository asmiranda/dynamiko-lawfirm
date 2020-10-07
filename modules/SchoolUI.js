const AbstractUI = require('./AbstractUI');
const { mongooseUtil } = require('../utils/mongooseUtil')
const { SchoolSchedule } = require('../beans/SchoolSchedule')
const { Person } = require('../beans/Person')
const { FileUpload } = require('../beans/FileUpload')

class SchoolUI extends AbstractUI {
    async getPWidget(request, callback) {
        if (request.query.action == "getDailyReading") {
            await this.getDailyReading(request, callback);
        }
        else {
            throw new Error(`${request.params.action} not implemented in ${this.constructor.name}`)
        }
    }

    async getWidget(request, callback) {
        if (request.params.action == "getAllFacultyModules") {
            await this.getAllFacultyModules(request, callback);
        }
        else if (request.params.action == "deleteActivity") {
            await this.deleteActivity(request, callback);
        }
        else if (request.params.action == "saveActivity") {
            await this.saveActivity(request, callback);
        }
        else if (request.params.action == "getActivity") {
            await this.getActivity(request, callback);
        }
        else if (request.params.action == "getActivities") {
            await this.getActivities(request, callback);
        }
        else if (request.params.action == "getSubmissions") {
            await this.getSubmissions(request, callback);
        }
        else if (request.params.action == "getStudents") {
            await this.getStudents(request, callback);
        }
        else {
            throw new Error(`${request.params.action} not implemented in ${this.constructor.name}`)
        }
    }

    async getAllFacultyModules(request, callback) {
        let filter = {};

        await mongooseUtil.findRecords(SchoolSchedule, filter, "facultyEmail", function (err, records) {
            if (records != null) {
                callback(records);
            }
            else {
                callback("");
            }
        });
    }

    async deleteActivity(request, callback) {
        await mongooseUtil.findSingleRecord(SchoolSchedule, {
            'section': request.params.term1, 'subject': request.params.term2
        }, async function (err, record) {
            console.log(err, record);
            record.activities.id(request.params.term3).remove();
            record = await record.save();
            callback(record.activities);
        })
    }

    async saveActivity(request, callback) {
        await mongooseUtil.findSingleRecord(SchoolSchedule, {
            'section': request.body.section, 'subject': request.body.subject
        }, async function (err, record) {
            console.log(err, record);
            if (request.body.activityId) {
                record.activities.forEach(activity => {
                    if (activity._id == request.body.activityId) {
                        activity.type = request.body.type;
                        activity.title = request.body.title;
                        activity.content = request.body.content;
                        activity.time = request.body.time;
                    }
                });
            }
            else {
                let activity = {};
                activity.type = request.body.type;
                activity.title = request.body.title;
                activity.content = request.body.content;
                activity.time = request.body.time;
                record.activities.push(activity);
            }
            record = await record.save();
            callback(record.activities);
        })
    }

    async getSubmissions(request, callback) {
        const section = request.params.term1;
        const subject = request.params.term2;
        const activityId = request.params.term3;
        await mongooseUtil.findRecords(FileUpload,
            {
                "uploadType": "activity-student",
                "key": section + "-" + subject,
                "subKey": activityId,
            }, "lastName", function (err, records) {
                if (records != null) {
                    callback(records);
                }
                else {
                    callback("");
                }
            });
    }

    async getDailyReading(request, callback) {
        const section = request.query.term1;
        const subject = request.query.term2;
        await mongooseUtil.findSingleRecord(FileUpload, { "key": section + "-" + subject }, function (err, record) {
            if (record != null) {
                callback(record);
            }
            else {
                callback("No attachment.");
            }
        });
    }

    async getStudents(request, callback) {
        const section = request.params.term1;
        const subject = request.params.term2;
        await mongooseUtil.findRecords(Person,
            {
                "schedules.section": section,
                "schedules.subject": subject,
                "personSubType": "Student"
            }, "firstName", function (err, records) {
                if (records != null) {
                    callback(records);
                }
                else {
                    callback("");
                }
            });
    }

    async getActivity(request, callback) {
        const section = request.params.term1;
        const subject = request.params.term2;
        const activityId = request.params.term3;
        await mongooseUtil.findSingleRecord(SchoolSchedule, { "section": section, "subject": subject, "activities._id": activityId }, function (err, record) {
            if (record != null) {
                callback(record.activities);
            }
            else {
                callback("");
            }
        });
    }

    async getActivities(request, callback) {
        const section = request.params.term1;
        const subject = request.params.term2;
        await mongooseUtil.findSingleRecord(SchoolSchedule, { "section": section, "subject": subject }, function (err, record) {
            if (record != null) {
                callback(record.activities);
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
            name: "SchoolUI",
            label: "School"
        };
    }
}

const schoolUI = new SchoolUI()
module.exports = schoolUI;
