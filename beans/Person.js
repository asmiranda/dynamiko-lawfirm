const mongoose = require('mongoose');
const { mongooseUtil } = require('../utils/mongooseUtil')
const { Schema } = mongoose;
const { SchoolScheduleSchema } = require('./SchoolSchedule')

const EnrollmentSchema = new Schema({
    dateEnrolled: Date,
});

const PersonSchema = new Schema({
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
    roles: [{ role: String }],
    schedules: [SchoolScheduleSchema],
    modules: [{
        module: String,
        code: String,
        label: String,
        read: Boolean,
        create: Boolean,
        update: Boolean,
        delete: Boolean
    }],
});
const Person = mongooseUtil.getConn().model('Person', PersonSchema, 'Person');
module.exports.EnrollmentSchema = EnrollmentSchema;

module.exports.Person = Person
module.exports.PersonSchema = PersonSchema;