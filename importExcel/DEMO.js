const { mongooseUtil } = require('../utils/mongooseUtil')
const { Person } = require('../beans/Person')
const { SchoolSchedule } = require('../beans/SchoolSchedule')
const excelUtil = require('../utils/excelUtil')

class DEMO {
    async importExcel(request, wb, callback) {
        let uploadFile = request.files.file;
        let fileName = uploadFile.name;

        await this.doStaff(wb);
        await this.doFaculty(wb);
        await this.doStudent(wb);
        await this.doSchedules(wb);

        callback(`Upload ${fileName} completed`);
    }

    async doSchedules(wb) {
        const sheet = wb.getWorksheet('Schedules');
        sheet.eachRow(async function (row, rowNumber) {
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            if (rowNumber > 1) {
                try {
                    let schedule = {};
                    schedule.facultyEmail = excelUtil.getCellValue(sheet, row, "Faculty");
                    schedule.section = excelUtil.getCellValue(sheet, row, "Section");
                    schedule.subject = excelUtil.getCellValue(sheet, row, "SubjectCode");
                    if (schedule.section != null && schedule.subject != null) {
                        schedule.subjectName = excelUtil.getCellValue(sheet, row, "SubjectName");
                        schedule.time = excelUtil.getCellValue(sheet, row, "Time");

                        let activitiesStr = excelUtil.getCellValue(sheet, row, "Activities");
                        if (activitiesStr.length > 10) {
                            let activitiesObj = JSON.parse(activitiesStr);
                            schedule.activities = activitiesObj.data;
                        }

                        await mongooseUtil.saveRecord(SchoolSchedule, { 'section': schedule.section, 'subject': schedule.subject }, schedule, function (err, doc, res) {
                            console.log(err, doc, res);
                        })
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }

    async doStudent(wb) {
        const sheet = wb.getWorksheet('Students');
        sheet.eachRow(async function (row, rowNumber) {
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            if (rowNumber > 1) {
                try {
                    let person = {};
                    person.email = excelUtil.getCellValue(sheet, row, "Email");
                    if (person.email != null && person.email.includes("@")) {
                        person.firstName = excelUtil.getCellValue(sheet, row, "FirstName");
                        person.lastName = excelUtil.getCellValue(sheet, row, "LastName");
                        person.gender = excelUtil.getCellValue(sheet, row, "Gender");
                        person.personType = 'Customer';
                        person.personSubType = 'Student';
                        person.roles = [{ role: 'Student' }];

                        let schedulesStr = excelUtil.getCellValue(sheet, row, "Schedules");
                        let schedulesObj = JSON.parse(schedulesStr);
                        person.schedules = schedulesObj.data;

                        let enrollmentStr = excelUtil.getCellValue(sheet, row, "Enrollment");
                        let enrollmentObj = JSON.parse(enrollmentStr);
                        person.enrollment = enrollmentObj.data;

                        person.password = 'password';
                        await mongooseUtil.saveRecord(Person, { 'email': person.email }, person, function (err, doc, res) {
                            console.log(err, doc, res);
                        })
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }

    async doFaculty(wb) {
        const sheet = wb.getWorksheet('Faculty');
        sheet.eachRow(async function (row, rowNumber) {
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            if (rowNumber > 1) {
                try {
                    let person = {};
                    person.email = excelUtil.getCellValue(sheet, row, "Email");
                    if (person.email != null && person.email.includes("@")) {
                        person.firstName = excelUtil.getCellValue(sheet, row, "FirstName");
                        person.lastName = excelUtil.getCellValue(sheet, row, "LastName");
                        person.gender = excelUtil.getCellValue(sheet, row, "Gender");
                        person.personType = 'Employee';
                        person.personSubType = 'Faculty';
                        person.roles = [{ role: 'Faculty' }];

                        let schedulesStr = excelUtil.getCellValue(sheet, row, "Schedules");
                        let schedulesObj = JSON.parse(schedulesStr);
                        person.schedules = schedulesObj.data;
                        person.password = 'password';
                        await mongooseUtil.saveRecord(Person, { 'email': person.email }, person, function (err, doc, res) {
                            console.log(err, doc, res);
                        })
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }

    async doStaff(wb) {
        const sheet = wb.getWorksheet('Staff');
        sheet.eachRow(async function (row, rowNumber) {
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            if (rowNumber > 1) {
                try {
                    let person = {};
                    person.email = excelUtil.getCellValue(sheet, row, "Email");
                    if (person.email != null && person.email.includes("@")) {
                        person.firstName = excelUtil.getCellValue(sheet, row, "FirstName");
                        person.lastName = excelUtil.getCellValue(sheet, row, "LastName");
                        person.gender = excelUtil.getCellValue(sheet, row, "Gender");
                        person.personType = 'Employee';
                        person.personSubType = 'SchoolStaff';
                        person.roles = [{ role: 'SchoolStaff' }];
                        person.modules = [
                            { module: 'FacultyUI', code: "FacultyUI", label: "Faculty", read: true, create: true, update: true, delete: true },
                            { module: 'StudentUI', code: "StudentUI", label: "Student", read: true, create: true, update: true, delete: true },
                            { module: 'SchoolScheduleUI', code: "SchoolScheduleUI", label: "Schedule", read: true, create: true, update: true, delete: true }
                        ];
                        person.password = 'password';
                        await mongooseUtil.saveRecord(Person, { 'email': person.email }, person, function (err, doc, res) {
                            console.log(err, doc, res);
                        })
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
}

const demo = new DEMO();
module.exports = demo;
