const dotenv = require('dotenv').config();
const cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
const bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
let mongoose = require("mongoose");
var expressLayouts = require('express-ejs-layouts');
const adminpaths = [
  { pathUrl: '/', routeFile: 'login'},
  { pathUrl: '/dashboard', routeFile: 'dashboard'},
  { pathUrl: '/apps', routeFile: 'apps'},
  { pathUrl: '/text', routeFile: 'text'},
  { pathUrl: '/logout', routeFile: 'logout'}
];
const apppaths = [
  { pathUrl: '/app', routeFile: 'index'},
];
var app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(cors());
app.use(
    session({
        cookie: { sameSite: "lax", maxAge: oneDay },
        resave: true,
        secret: process.env.AUTH_KEY,
        activeDuration: 5 * 60 * 1000,
        saveUninitialized: true
    })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/angular", express.static(__dirname + "/node_modules/angular"));
app.use("/angular-sanitize", express.static(__dirname + "/node_modules/angular-sanitize"));
mongoose.set('runValidators', true);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log("Well done! , connected with mongoDB database");
}).on('error', error => {
  console.log("Oops! database connection error:" + error);
});
adminpaths.forEach((path) => {
	app.use(path.pathUrl, require('./routes/admin/' + path.routeFile));
});
apppaths.forEach((path) => {
	app.use(path.pathUrl, require('./routes/app/' + path.routeFile));
});
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', {layout: false});
});
module.exports = app;
