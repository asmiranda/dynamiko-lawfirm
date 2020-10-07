const mongoose = require('mongoose');
const { mongooseUtil } = require('../utils/mongooseUtil')
const { Schema } = mongoose;

const PartySchema = new Schema({
    email: String,
    name: String,
    dateAdded: Date,
    participationType: String,
    description: String,
});

const CaseDocumentSchema = new Schema({
    createdByEmail: String,
    createdByName: String,
    dateAdded: Date,
    effectiveStartDate: Date,
    effectiveEndDate: Date,
    description: String,
});

const MemoSchema = new Schema({
    createdByEmail: String,
    createdByName: String,
    dateAdded: Date,
    effectiveStartDate: Date,
    effectiveEndDate: Date,
    description: String,
});

const TaskSchema = new Schema({
    taskDate: Date,
    title: String,
    description: String,
});

const WebLinkSchema = new Schema({
    addedDate: Date,
    url: String,
    title: String,
    description: String,
});

const PrescriptionSchema = new Schema({
    prescribedDate: Date,
    title: String,
    description: String,
});

const DocketSchema = new Schema({
    addedDate: Date,
    docketId: String,
    description: String,
});

const CaseSchema = new Schema({
    title: String,
    status: String,
    startDate: Date,

    lawyerEmail: String,
    lawyerName: String,
    clientEmail: String,
    clientName: String,
    description: String,
    parties: [PartySchema],
    documents: [CaseDocumentSchema],
    memos: [MemoSchema],
    tasks: [TaskSchema],
    webLinks: [WebLinkSchema],
    prescriptions: [PrescriptionSchema],
    dockets: [DocketSchema]
});
const Case = mongooseUtil.getConn().model('Case', CaseSchema, 'Case');
module.exports.Case = Case;
module.exports.CaseSchema = CaseSchema;
module.exports.PartySchema = PartySchema;
module.exports.CaseDocumentSchema = CaseDocumentSchema;
module.exports.MemoSchema = MemoSchema;
module.exports.TaskSchema = TaskSchema;
module.exports.WebLinkSchema = WebLinkSchema;
module.exports.PrescriptionSchema = PrescriptionSchema;
module.exports.DocketSchema = DocketSchema;