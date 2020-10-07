const express = require('express');
const router = express.Router();

const authService = require('../services/authService')
const BusinessException = require('../utils/businessException')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
/**
 * @swagger
 * /api/auth/signing:
 *  post:
 *      description: Sign In
 *      responses:
 *          '200':
 *              description: Success
 */
router.all('/signin', function (req, res) {
    authService.signin(req.body.username, req.body.password, function (obj) {
        if (obj instanceof BusinessException) {
            res.status(obj.code).send({ message: obj.message });
        }
        else {
            console.log("token", obj);
            res.send(obj);
        }
    });
});

/**
 * @swagger
 * /api/auth/validateToken:
 *  get:
 *      description: Validate Token
 *      responses:
 *          '200':
 *              description: Success
 */
router.get('/validateToken', function (req, res) {
    authService.validateToken(req, function (valid) {
        res.send(valid);
    });
});

module.exports = router;
