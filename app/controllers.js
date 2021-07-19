"use strict";
exports.__esModule = true;
exports.router = void 0;
var fs = require("fs");
var express_1 = require("express");
var articles_1 = require("./models/articles");
var musings_1 = require("./models/musings");
var router = express_1.Router();
exports.router = router;
router.get('/articles/:slug', function (req, res) {
    try {
        var content = fs.readFileSync("./app/public/articles/" + req.params.slug + ".html");
        var article = articles_1.articles.find(function (x) { return x.slug === req.params.slug; });
        res.render('articles/show', { content: content, article: article });
    }
    catch (_a) {
        res.render('misc/404');
    }
});
router.get('/articles', function (req, res) {
    res.render('articles/index', { articles: articles_1.articles });
});
router.get('/projects', function (req, res) {
    res.render('projects/index');
});
router.get('/books', function (req, res) {
    res.render('books/index');
});
router.get('/contact', function (req, res) {
    res.render('contact/index');
});
router.get('/vue-toronto-2020', function (req, res) {
    res.render('misc/vue-toronto-2020');
});
router.get('/musings/:slug', function (req, res) {
    try {
        var content = fs.readFileSync("./app/public/musings/" + req.params.slug + ".html");
        var musing = musings_1.musings.find(function (x) { return x.slug === req.params.slug; });
        res.render('musings/show', { content: content, musing: musing });
    }
    catch (_a) {
        res.render('misc/404');
    }
});
router.get('/musings', function (req, res) {
    res.render('musings/index', { musings: musings_1.musings });
});
router.get('/screencasts/spreadsheet-engine-from-scratch', function (req, res) {
    res.render('screencasts/spreadsheet-engine-from-scratch');
});
router.get('/typing-the-test-suite', function (req, res) {
    var landingPage = fs.readFileSync('./app/views/marketing/typing-the-test-suite.html');
    res.render('marketing/typing-the-test-suite', {
        landingPage: landingPage
    });
});
router.get('/design-patterns-for-vuejs', function (req, res) {
    var landingPage = fs.readFileSync('./app/views/marketing/design-patterns-for-vuejs.html');
    res.render('marketing/design-patterns-for-vuejs', {
        landingPage: landingPage
    });
});
router.get('/design-patterns-for-vuejs-ja', function (req, res) {
    var landingPage = fs.readFileSync('./app/views/marketing/design-patterns-for-vuejs-ja.html');
    res.render('marketing/design-patterns-for-vuejs', {
        landingPage: landingPage
    });
});
router.get('/screencasts', function (req, res) {
    res.render('screencasts/index');
});
router.get('/', function (req, res) {
    res.render('home/index');
});
router.get('*', function (req, res) {
    res.render('misc/404');
});
