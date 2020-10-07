const dbUtil = require('../utils/dbUtil')
const Person = require('../beans/Person');

class EPLTRC {
    importExcel(request, wb, callback) {
        let uploadFile = request.files.file;
        let fileName = uploadFile.name;

        this.removeMockData();
        this.doStaff(wb);
        // this.doFaculty(wb);
        // this.doStudent(wb);
        // this.doSection(wb);
        // this.doSubject(wb);
        // this.doSchedules(wb);
        // this.autoEnroll();

        callback(`Upload ${fileName} completed`);
    }

    async autoEnroll() {
        dbUtil.getRecords(`select * from Person where personSubType='Student'`, function (records) {
            records.forEach(record => {
                console.log(record);
                schoolService.enrollStudent(record, "EPLTRC", "Excel Import");
            });
        })
    }

    async doSchedules(wb) {
        let context = this;
        const sheet = wb.getWorksheet('Schedules');
        sheet.eachRow(function (row, rowNumber) {
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            if (rowNumber > 1) {
                try {
                    let schedule = {};
                    schedule.subjectCode = context.getCellValue(sheet, row, "SubjectCode");
                    schedule.facultyEmail = context.getCellValue(sheet, row, "FacultyEmail");
                    schedule.sectionCode = context.getCellValue(sheet, row, "Section");
                    schedule.startTime = "1pm";
                    schedule.endTime = "5pm";
                    schedule.confName = `${schedule.subjectCode} ${schedule.facultyEmail}`;
                    schedule.code = `SC-${schedule.confName}`;

                    if (schedule.subjectCode != null) {
                        dbUtil.checkIfElseExists(`select count(*) from SchoolSchedule where subjectCode='${schedule.subjectCode}' and facultyEmail='${schedule.facultyEmail}' and sectionCode='${schedule.sectionCode}'`,
                            function () {
                                console.log(`Schedule [${schedule.subjectCode} - ${schedule.facultyEmail}] exists.`)
                            },
                            function () {
                                dbUtil.saveRecord('SchoolSchedule', SchoolSchedule, schedule, function (obj) {
                                    console.log(`Schedule [${schedule.subjectCode} - ${schedule.facultyEmail}] added.`)
                                });
                            })
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }

    async doSubject(wb) {
        let context = this;
        const sheet = wb.getWorksheet('Subject');
        sheet.eachRow(function (row, rowNumber) {
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            if (rowNumber > 1) {
                try {
                    let subject = {};
                    subject.code = context.getCellValue(sheet, row, "Code");
                    subject.name = context.getCellValue(sheet, row, "Subject");
                    if (subject.name != null) {
                        dbUtil.checkIfElseExists(`select count(*) from Subject where name='${subject.name}'`,
                            function () {
                                console.log(`Subject [${subject.name}] exists.`)
                            },
                            function () {
                                dbUtil.saveRecord('Subject', Subject, subject, function (obj) {
                                    console.log(`Subject [${subject.name}] added.`)
                                });
                            })
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }

    async doSection(wb) {
        let context = this;
        const sheet = wb.getWorksheet('Section');
        sheet.eachRow(function (row, rowNumber) {
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            if (rowNumber > 1) {
                try {
                    let section = {};
                    section.code = context.getCellValue(sheet, row, "Section");
                    section.name = context.getCellValue(sheet, row, "Section");
                    if (section.name != null) {
                        dbUtil.checkIfElseExists(`select count(*) from Section where email='${section.name}'`,
                            function () {
                                console.log(`Section [${section.name}] exists.`)
                            },
                            function () {
                                dbUtil.saveRecord('Section', Section, section, function (obj) {
                                    console.log(`Section [${section.name}] added.`)
                                });
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
        let context = this;
        const sheet = wb.getWorksheet('Students');
        sheet.eachRow(function (row, rowNumber) {
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            if (rowNumber > 1) {
                try {
                    let person = {};
                    person.firstName = context.getCellValue(sheet, row, "FirstName");
                    person.lastName = context.getCellValue(sheet, row, "LastName");
                    person.email = context.getCellValue(sheet, row, "Email");
                    person.personType = 'Customer';
                    person.personSubType = 'Student';
                    if (person.email != null && person.email.includes("@")) {
                        dbUtil.checkIfElseExists(`select count(*) from Person where email='${person.email}'`,
                            function () {
                                securityUtils.addRoleAccount("Excel Import", "STUDENT", person.email);
                            },
                            function () {
                                dbUtil.saveRecord('Person', Person, person, function (obj) {
                                    securityUtils.addRoleAccount("Excel Import", "STUDENT", person.email);
                                });
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
        let context = this;
        const sheet = wb.getWorksheet('Faculty');
        sheet.eachRow(function (row, rowNumber) {
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            if (rowNumber > 1) {
                try {
                    let person = {};
                    person.firstName = context.getCellValue(sheet, row, "FirstName");
                    person.lastName = context.getCellValue(sheet, row, "LastName");
                    person.email = context.getCellValue(sheet, row, "Email");
                    person.personType = 'Employee';
                    person.personSubType = 'Faculty';
                    if (person.email != null && person.email.includes("@")) {
                        dbUtil.checkIfElseExists(`select count(*) from Person where email='${person.email}'`,
                            function () {
                                securityUtils.addRoleAccount("Excel Import", "FACULTY", person.email);
                            },
                            function () {
                                dbUtil.saveRecord('Person', Person, person, function (obj) {
                                    securityUtils.addRoleAccount("Excel Import", "FACULTY", person.email);
                                });
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
        let context = this;
        const sheet = wb.getWorksheet('Staff');
        sheet.eachRow(function (row, rowNumber) {
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            if (rowNumber > 1) {
                try {
                    let person = {};
                    person.firstName = context.getCellValue(sheet, row, "FirstName");
                    person.lastName = context.getCellValue(sheet, row, "LastName");
                    person.email = context.getCellValue(sheet, row, "Email");
                    person.personType = 'Employee';
                    person.personSubType = 'School Staff';
                    if (person.email != null && person.email.includes("@")) {
                        dbUtil.checkIfElseExists(`select count(*) from Person where email='${person.email}'`,
                            function () {
                                securityUtils.addRoleAccount("Excel Import", "SCHOOL STAFF", person.email);
                            },
                            function () {
                                dbUtil.saveRecord('Person', Person, person, function (obj) {
                                    securityUtils.addRoleAccount("Excel Import", "SCHOOL STAFF", person.email);
                                });
                            })
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }

    getCellValue(sheet, row, header) {
        let columnOffset = 1;
        let headerRow = sheet.getRow(1);
        headerRow.eachCell({ includeEmpty: false }, function (cell, colNumber) {
            console.log('Cell ' + colNumber + ' = ' + cell.value);
            if (cell.value == header) {
                columnOffset = colNumber;
            }
        });
        if (columnOffset == 0) {
            return "";
        }
        else {
            let value = row.getCell(columnOffset).value;
            if (value) {
                return value.text;
            }
            else {
                return "";
            }
        }
    }

    removeMockData() {
        dbUtil.removeMockData("Person");
        dbUtil.removeMockData("User");
        dbUtil.removeMockData("Role");
        dbUtil.removeMockData("UserRole");
        dbUtil.removeMockData("Section");
        dbUtil.removeMockData("Subject");
        dbUtil.removeMockData("SchoolSchedule");
        dbUtil.removeMockData("Enrollment");
        dbUtil.removeMockData("EnrollmentSchedule");
    }
}

const epltrc = new EPLTRC();
module.exports = epltrc;
