const dbUtil = require('../utils/dbUtil')
const { QueryTypes } = require('sequelize');
const AbstractUI = require('./AbstractUI')

class EnrollmentScheduleUI extends AbstractUI {
    async getAutoComplete(request, callback) {
        const field = request.params.field;
        const code = request.params.code;
        if (field == "schoolScheduleCode") {
            const sequelize = await dbUtil.getConnection();
            let sql = `
                select sched.code 'key', concat(sched.subjectCode,' - ',' [',startTime,' to ',endTime,'] by ',fac.firstName,' ',fac.lastName) 'value'
                from SchoolSchedule sched
                    join Person fac on sched.facultyEmail = fac.email
            `
            if (code != null && code != "") {
                sql += ` and (subjectCode like '%${code}%') `
            }
            sql += " order by sched.subjectCode"

            const records = await sequelize.query(sql, { type: QueryTypes.SELECT });
            callback(records);
        }
        else {
            throw new Error(`AutoComplete for ${field} not implemented in ${this.constructor.name}`)
        }
    }

    async getAutoCompleteLabel(request, callback) {
        const field = request.params.field;
        const code = request.params.code;
        if (field == "schoolScheduleCode") {
            const sequelize = await dbUtil.getConnection();
            const sql = `
                select sched.code 'key', concat(sched.subjectCode,' - ',' [',startTime,' to ',endTime,'] by ',fac.firstName,' ',fac.lastName)  'value', 'schoolScheduleCode' fieldName
                from SchoolSchedule sched
                    join Person fac on sched.facultyEmail = fac.email
                where sched.code = '${code}'
            `
            const records = await sequelize.query(sql, { type: QueryTypes.SELECT });
            callback(records[0]);
        }
        else {
            throw new Error(`AutoCompleteLabel for ${field} not implemented in ${this.constructor.name}`)
        }
    }

    getLeftMenu(user) {
        return {
            groupName: "School",
            group: "School",
            name: "EnrollmentScheduleUI",
            label: "Student Schedule"
        };
    }
}

const enrollmentScheduleUI = new EnrollmentScheduleUI()
module.exports = enrollmentScheduleUI;
