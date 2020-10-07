const dbUtil = require("../utils/dbUtil");
const Enrollment = require('../beans/Enrollment');
const EnrollmentSchedule = require('../beans/EnrollmentSchedule');

class SchoolService {
    async enrollStudent(record, section, createdBy) {
        const studentEmail = record.email;
        await dbUtil.checkIfElseExists(`select count(*) from Enrollment where studentEmail='${studentEmail}'`,
            function () {

            },
            async function () {
                let enrollment = {};
                enrollment.studentEmail = studentEmail;
                enrollment.sectionCode = section;
                enrollment.code = `ENR-${studentEmail}`;
                await dbUtil.saveRecord("Enrollment", Enrollment, enrollment);
            });

        await dbUtil.deleteRecords(`delete from EnrollmentSchedule where studentEmail='${studentEmail}'`);

        await dbUtil.getRecords(`select a.* from SchoolSchedule a where a.sectionCode='${section}' order by id`,
            async function (records) {
                records.forEach(record => {
                    console.log(record);
                    let enrollmentSchedule = {};
                    enrollmentSchedule.enrollmentCode = `ENR-${studentEmail}`;
                    enrollmentSchedule.schoolScheduleCode = record.code;
                    enrollmentSchedule.days = record.days;
                    enrollmentSchedule.startTime = record.startTime;
                    enrollmentSchedule.endTime = record.endTime;
                    enrollmentSchedule.subjectCode = record.subjectCode;
                    enrollmentSchedule.roomCode = record.roomCode;
                    enrollmentSchedule.studentEmail = studentEmail;
                    enrollmentSchedule.facultyEmail = record.facultyEmail;
                    enrollmentSchedule.code = `ENR-${record.code}-${studentEmail}`;
                    enrollmentSchedule.createdBy = createdBy;
                    dbUtil.saveRecord("EnrollmentSchedule", EnrollmentSchedule, enrollmentSchedule);
                });
            });
    }
}

const schoolService = new SchoolService();
module.exports = schoolService;
