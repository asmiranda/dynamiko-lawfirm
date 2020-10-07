// const dbUtil = require('../utils/dbUtil')
// const { QueryTypes } = require('sequelize');
const moduleHelper = require('../modules/ModuleHelper')
const ExcelJS = require('exceljs-node');
const importExcel = require("../importExcel/ImportExcel")
const { mongooseUtil } = require('../utils/mongooseUtil')
const { FileUpload } = require('../beans/FileUpload')

class GenericService {
    async importExcel(request, callback) {
        let uploadFile = request.files.file;
        let data = uploadFile.data;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(data);
        const uploadDetailWS = workbook.getWorksheet('UploadDetail');
        const row = uploadDetailWS.getRow(1);
        let uploadType = row.getCell(1).value;
        console.log(uploadType);
        importExcel.importExcel(uploadType, request, workbook, callback);
    }

    async getAutoComplete(request, callback) {
        moduleHelper.getAutoComplete(request, function (retObj) {
            callback(retObj);
        })
    }

    async getAutoCompleteLabel(request, callback) {
        moduleHelper.getAutoCompleteLabel(request, function (retObj) {
            callback(retObj);
        })
    }

    async upload(request, callback) {
        if (!request.files || Object.keys(request.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        else {
            let uploadFile = request.files.file;
            let fileUpload = {};
            fileUpload.uploadType = request.params.fileType;
            fileUpload.key = request.params.moduleName;
            fileUpload.subKey = request.params.moduleCode;
            fileUpload.fileName = uploadFile.name;
            fileUpload.file = uploadFile.data;
            fileUpload.fileSize = uploadFile.size;
            fileUpload.uploadedBy = request.user.username;
            fileUpload.uploadDate = new Date();
            fileUpload.firstName = request.user.firstName;
            fileUpload.lastName = request.user.lastName;

            await mongooseUtil.saveRecord(FileUpload, {
                'uploadType': fileUpload.uploadType,
                'key': fileUpload.key,
                'subKey': fileUpload.subKey,
                'uploadedBy': fileUpload.uploadedBy
            }, fileUpload, function (err, doc, res) {
                console.log(err, doc, res);
                callback("Uploaded");
            })
        }
    }

    async getPWidget(request, callback) {
        moduleHelper.getPWidget(request, function (retObj) {
            callback(retObj);
        })
    }

    async getWidget(request, callback) {
        moduleHelper.getWidget(request, function (retObj) {
            callback(retObj);
        })
    }

    async getLeftMenu(request, callback) {
        moduleHelper.getLeftMenu(request.user, function (leftMenus) {
            callback(leftMenus);
        })
    }

    async download(request, callback) {
        await mongooseUtil.findSingleRecord(FileUpload, {
            uploadType: request.params.downloadType,
            uploadedBy: request.params.username,
            key: request.params.key,
            subKey: request.params.subKey
        }, async function (err, record) {
            if (record == null) {
                callback("No attachment.");
            }
            else {
                callback(record);
            }
        })
    }

    async getProfilePic(request, callback) {
        await mongooseUtil.findSingleRecord(FileUpload, { key: 'Person-ProfilePic', subKey: request.params.email }, async function (err, record) {
            if (record == null) {
                const nodeUtil = require('../utils/nodeUtil')
                await nodeUtil.generateAvatar(request.params.email, request.params.gender, callback);
            }
            else {
                callback(record.file);
            }
        })
    }

    async uploadProfilePic(request, callback) {
        let uploadFile = request.files.file;
        let fileUpload = {};
        fileUpload.uploadType = 'profile-pic';
        fileUpload.key = 'Person-ProfilePic';
        fileUpload.subKey = request.user.username;
        fileUpload.fileName = uploadFile.name;
        fileUpload.file = uploadFile.data;
        fileUpload.fileSize = uploadFile.size;
        fileUpload.uploadedBy = request.user.username;
        fileUpload.uploadDate = new Date();
        fileUpload.firstName = request.user.firstName;
        fileUpload.lastName = request.user.lastName;

        await mongooseUtil.saveRecord(FileUpload, { 'key': fileUpload.key, 'subKey': fileUpload.subKey }, fileUpload, function (err, doc, res) {
            console.log(err, doc, res);
            callback("Uploaded");
        })
    }
}

const genericService = new GenericService();
module.exports = genericService;
