const mongoose = require('mongoose');
const { mongooseUtil } = require('../utils/mongooseUtil')
const { Schema } = mongoose;

const FileUploadSchema = new Schema({
    uploadType: String,
    key: String,
    subKey: String,
    fileName: String,
    fileSize: Number,
    file: Buffer,
    uploadedBy: String,
    uploadDate: Date,
    firstName: String,
    lastName: String
});
const FileUpload = mongooseUtil.getConn().model('FileUpload', FileUploadSchema, 'FileUpload');

module.exports.FileUploadSchema = FileUploadSchema;
module.exports.FileUpload = FileUpload
