var app = require('express')();
var db = require('./db');
var path = require('path');
var express = require('express');
var schedule = require('node-schedule');
var helmet = require('helmet');

app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
  return next();
});

/* scheduler start */
var j =  schedule.scheduleJob(unbookScheduler.cronExprUnbook, unbookScheduler.func);
var k = schedule.scheduleJob(unbookScheduler.cronExprExpire, unbookScheduler.expireFunc);
/* scheduler end */

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'public','index.html'));
});

module.exports = app;
