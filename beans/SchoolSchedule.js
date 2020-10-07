const mongoose = require('mongoose');
const { mongooseUtil } = require('../utils/mongooseUtil')
const { Schema } = mongoose;

const ActivitySchema = new Schema({
    type: String,
    title: String,
    content: String,
    time: String,
    attachment: String
});

const SchoolScheduleSchema = new Schema({
    facultyEmail: String,
    section: String,
    subject: String,
    subjectName: String,
    time: String,
    activities: [ActivitySchema]
});
const SchoolSchedule = mongooseUtil.getConn().model('SchoolSchedule', SchoolScheduleSchema, 'SchoolSchedule');

module.exports.ActivitySchema = ActivitySchema;

module.exports.SchoolSchedule = SchoolSchedule
module.exports.SchoolScheduleSchema = SchoolScheduleSchema;
