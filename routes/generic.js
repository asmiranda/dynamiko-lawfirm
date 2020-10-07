const express = require('express');
const router = express.Router();

const genericService = require('../services/genericService')

/**
 * @swagger
 * /api/generic/getLeftMenu:
 *      get:
 *          description: Get Left Menu
 *          responses:
 *              '200':
 *                  description: Success
 */
router.get('/getLeftMenu', function (req, res) {
    genericService.getLeftMenu(req, function (lstMenu) {
        res.send(lstMenu);
    })
});

router.get('/autocomplete/:widget/:field/:code?', function (req, res) {
    genericService.getAutoComplete(req, function (autocompleteList) {
        res.send(autocompleteList);
    })
});
router.get('/autocompletelabel/:widget/:field/:code', function (req, res) {
    genericService.getAutoCompleteLabel(req, function (autocompleteMap) {
        res.send(autocompleteMap);
    })
});
router.post('/uploadProfilePic', function (req, res) {
    genericService.uploadProfilePic(req, function (profile) {
        res.send(profile);
    })
});
router.post('/attachment/upload/:fileType/:moduleName/:moduleCode', function (req, res) {
    genericService.upload(req, function (lstUploads) {
        res.send(lstUploads);
    })
});
router.all('/widget/:widget?/:action?/:term1?/:term2?/:term3?/:term4?', function (req, res) {
    genericService.getWidget(req, function (retObj) {
        if (retObj.file != null) {
            res.status(200);
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': "application/octet-stream",
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
