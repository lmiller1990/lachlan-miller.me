"use strict";
exports.__esModule = true;
exports.router = void 0;
var fs = require("fs");
var express_1 = require("express");
var articles_1 = require("./models/articles");
var musings_1 = require("./models/musings");
var router = express_1.Router();
exports.router = router;
router.use('/articles/:slug', function (req, res) {
    try {
        var content = fs.readFileSync("./app/public/articles/" + req.params.slug + ".html");
        var article = articles_1.articles.find(function (x) { return x.slug === req.params.slug; });
        res.render('articles/show', { content: content, article: article });
    }
    catch (_a) {
        res.render('misc/404');
    }
});
router.use('/articles', function (req, res) {
    res.render('articles/index', { articles: articles_1.articles });
});
router.use('/projects', function (req, res) {
    res.render('projects/index');
});
router.use('/books', function (req, res) {
    res.render('books/index');
});
router.use('/contact', function (req, res) {
    res.render('contact/index');
});
router.use('/vue-toronto-2020', function (req, res) {
    res.render('misc/vue-toronto-2020');
});
router.use('/musings/:slug', function (req, res) {
    try {
        var content = fs.readFileSync("./app/public/musings/" + req.params.slug + ".html");
        var musing = musings_1.musings.find(function (x) { return x.slug === req.params.slug; });
        res.render('musings/show', { content: content, musing: musing });
    }
    catch (_a) {
        res.render('misc/404');
    }
});
router.use('/musings', function (req, res) {
    res.render('musings/index', { musings: musings_1.musings });
});
router.use('/screencasts/spreadsheet-engine-from-scratch', function (req, res) {
    res.render('screencasts/spreadsheet-engine-from-scratch');
});
router.use('/design-patterns-for-vuejs', function (req, res) {
    var landingPage = fs.readFileSync('./app/views/marketing/design-patterns-for-vuejs.html');
    res.render('marketing/design-patterns-for-vuejs', {
        landingPage: landingPage,
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
    });
});
router.use('/screencasts', function (req, res) {
    res.render('screencasts/index');
});
router.use('/', function (req, res) {
    res.render('home/index');
});
router.use('*', function (req, res) {
    res.render('misc/404');
});
