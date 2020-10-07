var express = require('express');
var router = express.Router();

// @GetMapping("/clearResource")
// @PostMapping("/repeatHtmlRowIndex")

router.get('/signin', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/getProfile', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
