const mongoose = require('mongoose');
const { mongooseUtil } = require('../utils/mongooseUtil')
const { Schema } = mongoose;

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
    roles: [{ role: String }]
});
const Person = mongooseUtil.getConn().model('Person', PersonSchema, 'Person');

module.exports.Person = Person
module.exports.PersonSchema = PersonSchema;