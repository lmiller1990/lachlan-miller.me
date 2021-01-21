"use strict";
exports.__esModule = true;
var express = require('express');
var fs = require('fs');
var controllers_1 = require("./controllers");
try {
    var app = express();
    app.set('view engine', 'pug');
    app.set('views', './app/views');
    app.use(controllers_1.router);
    app.listen('8000', function () { return console.log('Started on port 8000'); });
}
catch (e) {
    fs.writeFileSync('./error.txt', e.message);
}
