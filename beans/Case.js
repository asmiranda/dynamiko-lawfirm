const mongoose = require('mongoose');
const { mongooseUtil } = require('../utils/mongooseUtil')
const { Schema } = mongoose;

const CaseSchema = new Schema({
    lastName: String,
    firstName: String,
    middleInitial: String,
    email: String,
    personType: String,
    personSubType: String,
    address: String,
    phone: String,
    gender: String,
    password: String,
    birthDate: Date,
    enrollment: EnrollmentSchema,
    schedules: [SchoolScheduleSchema]
});
const Case = mongooseUtil.getConn().model('Case', CaseSchema, 'Case');
module.exports.Case = Case;
module.exports.CaseSchema = CaseSchema;