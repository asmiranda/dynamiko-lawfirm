// var server = "dynamikosoft.com";
var server = window.location.hostname;
var port = window.location.port;
var servicePort = parseInt(port) + 1000;
var MAIN_URL = `https://${server}:${servicePort}`;

var dynaRegister;

class Config {
    getDateFormat() {
        return 'yyyy-mm-dd';
    }
}

$(function () {
    config = new Config();
})