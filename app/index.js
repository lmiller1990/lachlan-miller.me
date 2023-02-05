"use strict";
exports.__esModule = true;
var express = require('express');
var fs = require('fs');
var controllers_1 = require("./controllers");
var PORT = 7000;
try {
    var app = express();
    app.set('view engine', 'pug');
    app.set('views', './app/views');
    app.use(controllers_1.router);
    app.listen(PORT, function () { return console.log("Started on port " + PORT); });
}
catch (e) {
    fs.writeFileSync('./error.txt', e.message);
}
