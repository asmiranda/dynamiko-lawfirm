const dbUtil = require('../utils/dbUtil')
const { QueryTypes } = require('sequelize');
const AbstractUI = require('./AbstractUI')

class EnrollmentUI extends AbstractUI {
    async getAutoComplete(request, callback) {
        const field = request.params.field;
        const code = request.params.code;
        if (field == "studentEmail") {
            const sequelize = await dbUtil.getConnection();
            let sql = `
                select email 'key', concat(lastName,', ',firstName) 'value'
                from Person
                where personSubType='Student' 
            `
            if (code != null && code != "") {
                sql += ` and (firstName like '%${code}%' or lastName like '%${code}%') `
            }
            sql += " order by lastName, firstName "

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
        if (field == "studentEmail") {
            const sequelize = await dbUtil.getConnection();
            const sql = `
                select email 'key', concat(lastName,', ',firstName) 'value', 'studentEmail' fieldName
                from Person a
                where email = '${code}'
            `
            const records = await sequelize.query(sql, { type: QueryTypes.SELECT });
            callback(records[0]);
        }
        else {
            throw new Error(`AutoCompleteLabel for ${field} not implemented in ${this.constructor.name}`)
        }
    }

    async getWidget(request, callback) {
        if (request.params.action == "getTopRecords") {
            await this.getTopRecords(request, callback);
        }
        else if (request.params.action == "loadStudentEnrollment") {
            await this.loadStudentEnrollment(request, callback);
        }
        else if (request.params.action == "removeSchedule") {
            await this.removeSchedule(request, callback);
        }
        else if (request.params.action == "filterRecord") {
            await this.getTopRecords(request, callback);
        }
        else if (request.params.action == "saveRecord") {
            await this.saveRecord(request, callback);
        }
        else if (request.params.action == "saveSubRecord") {
            await this.saveSubRecord(request, callback);
        }
        else if (request.params.action == "getRecordProfile") {
            await this.getRecordProfile(request, callback);
        }
        else {
            throw new Error(`${request.params.action} not implemented in ${this.constructor.name}`)
        }
    }

    async removeSchedule(request, callback) {
        const sequelize = await dbUtil.getConnection();

        const email = request.params.term1;
        const schoolScheduleCode = request.params.term2;
        const sqlDelete = `
            delete from EnrollmentSchedule 
            where id > 0 and studentEmail='${email}' and schoolScheduleCode='${schoolScheduleCode}'
        `
        await sequelize.query(sqlDelete, { type: QueryTypes.DELETE });

        const sql = `
            select a.*
            from Enrollment a
            where a.studentEmail='${email}'
        `
        const profiles = await sequelize.query(sql, { type: QueryTypes.SELECT });
        let enrollment = profiles[0];

        let scheduleSql = `
            select a.*
            from EnrollmentSchedule a 
            where a.studentEmail = '${enrollment.studentEmail}'
        `
        const schedules = await sequelize.query(scheduleSql, { type: QueryTypes.SELECT });
        enrollment.EnrollmentScheduleUI = schedules;
        callback(enrollment);
    }

    async loadStudentEnrollment(request, callback) {
        const sequelize = await dbUtil.getConnection();
        const sql = `
            select a.*
            from Enrollment a
            where a.studentEmail='${request.params.term1}'
        `
        const enrollments = await sequelize.query(sql, { type: QueryTypes.SELECT });
        let enrollment = null;
        if (enrollments != null && enrollments.length > 0) {
            enrollment = enrollments[0];
        }
        else {
            Enrollment.studentEmail = request.body.studentEmail;
            Enrollment.dateEnrolled = request.body.dateEnrolled;
            enrollment = await dbTable.create(Person);
        }
        let scheduleSql = `
            select a.*
            from EnrollmentSchedule a 
            where a.studentEmail = '${enrollment.studentEmail}'
        `
        const schedules = await sequelize.query(scheduleSql, { type: QueryTypes.SELECT });
        enrollment.EnrollmentScheduleUI = schedules;

        callback(enrollment);
    }

    async saveRecord(request, callback) {
        const sequelize = await dbUtil.getConnection();
        const dbTable = sequelize.define('Person', Person, {
            timestamps: false,
        });

        const sql = `
            select a.*
            from Enrollment a
            where a.studentEmail='${request.body.email}'
        `
        const enrollments = await sequelize.query(sql, { type: QueryTypes.SELECT });
        if (enrollments != null && enrollments.length > 0) {
            const enrollment = enrollments[0];
            enrollment.studentEmail = request.body.studentEmail;
            enrollment.dateEnrolled = request.body.dateEnrolled;
            const recordObj = await dbTable.update(enrollment, { where: { studentEmail: request.body.email } });
            callback(recordObj);
        }
        else {
            Enrollment.studentEmail = request.body.studentEmail;
            Enrollment.dateEnrolled = request.body.dateEnrolled;
            const recordObj = await dbTable.create(Person);
            callback(recordObj);
        }
    }

    async saveSubRecord(request, callback) {
        const enrollmentCode = request.body.code
        const studentEmail = request.body.studentEmail
        if (studentEmail == null || studentEmail == '') {
            throw new Error(`Please input student.`)
        }
        else {
            const schoolScheduleCode = request.body.Child.schoolScheduleCode
            if (schoolScheduleCode != null || schoolScheduleCode != '') {
                const sequelize = await dbUtil.getConnection();
                const dbTable = sequelize.define('EnrollmentSchedule', EnrollmentSchedule, {
                    timestamps: false,
                });
                EnrollmentSchedule.enrollmentCode = enrollmentCode;
                EnrollmentSchedule.studentEmail = studentEmail;
                EnrollmentSchedule.schoolScheduleCode = schoolScheduleCode;
                const recordObj = await dbTable.create(EnrollmentSchedule);
                callback(recordObj);
            }
        }
    }

    async getRecordProfile(request, callback) {
        const sequelize = await dbUtil.getConnection();
        const sql = `
            select a.*
            from Enrollment a
            where a.id=${request.params.term1}
        `
        const profiles = await sequelize.query(sql, { type: QueryTypes.SELECT });
        let enrollment = profiles[0];

        let scheduleSql = `
            select a.*
            from EnrollmentSchedule a 
            where a.studentEmail = '${enrollment.studentEmail}'
        `
        const schedules = await sequelize.query(scheduleSql, { type: QueryTypes.SELECT });
        enrollment.EnrollmentScheduleUI = schedules;
        callback(enrollment);
    }

    async getTopRecords(request, callback) {
        const sequelize = await dbUtil.getConnection();
        let sql = `
            select a.*, b.firstName, b.lastName 
            from Enrollment a
                join Person b on a.studentEmail=b.email
            where a.code is not null
        `
        const mainFilter = request.query.mainFilter;
        if (mainFilter != null && mainFilter != "") {
            sql += ` and (b.firstName like '%${mainFilter}%' or b.lastName like '%${mainFilter}%') `
        }
        sql += " order by b.lastName "
        const topRecords = await sequelize.query(sql, { type: QueryTypes.SELECT });
        callback(topRecords);
    }

    getLeftMenu(user) {
        return {
            groupName: "School",
            group: "School",
            name: "EnrollmentUI",
            label: "Enrollment"
        };
    }
}

const enrollmentUI = new EnrollmentUI()
module.exports = enrollmentUI;
