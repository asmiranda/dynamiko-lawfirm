const express = require('express');
const { FileUpload } = require('../beans/FileUpload');
const router = express.Router();

const genericService = require('../services/genericService')

/**
 * @swagger
 * /api/pgeneric/importExcel:
 *  post:
 *      summary: Uploads a file.
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: formData
 *          name: file
 *          type: file
 *          description: The file to upload.
 */

router.post('/importExcel', function (req, res) {
    genericService.importExcel(req, function (retObj) {
        res.send(retObj);
    })
});

router.get('/download/:downloadType/:username/:key/:subKey', function (req, res) {
    genericService.download(req, function (retObj) {
        if (retObj instanceof FileUpload) {
            res.status(200);
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': `application/${retObj.uploadType}`,
                'Content-Length': retObj.fileSize,
                'Content-Disposition': 'inline; filename=' + retObj.fileName
            });
            res.send(retObj.file);
        }
        else {
            res.status(401);
            res.send(retObj);
        }
    })
});

router.get('/profilePic/:email/:gender', function (req, res) {
    genericService.getProfilePic(req, function (retObj) {
        // res.status(200);
        res.send(retObj);
    })
});

router.all('/', function (req, res) {
    genericService.getPWidget(req, function (retObj) {
        if (retObj.fileSize != null && retObj.fileSize > 10) {
            res.status(200);
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': `application/${retObj.uploadType}`,
                'Content-Length': retObj.fileSize,
                'Content-Disposition': 'inline; filename=' + retObj.fileName
            });
            res.send(retObj.file);
        }
        else {
            res.send(retObj);
        }
    })
});

module.exports = router;
