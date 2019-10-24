/*
=====================================
  ; Title: app.js
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: app.js
======================================
*/

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./db-models/users');
const SecurityQuestion = require('./db-models/securityQuestions');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

// Global variables
const serverPort = 3000;

/************************* Mongoose connection strings go below this line  ***************/

// MongoDB (Atlas) connection string
const connString = 'mongodb+srv://admin:bu12345@bcrs-waeqk.mongodb.net/bcrs?retryWrites=true&w=majority'

// MongoDB connect
mongoose.connect(connString, {promiseLibrary: require('bluebird'), useNewUrlParser: true})
        .then(() => console.debug('Connection to the MongoDB instance was successful'))
        .catch((err) => console.debug('MongoDB Error: ' + err.message));

/************************* API routes go below this line ********************/

/****************************USER API*******************************  */

//Get all users
app.get('/api/users/all', function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(users);
      res.json(users);
    }
  })
});


//Get User by Id
app.get('/api/users/:email/:password', function(req, res, next) {
  User.findOne({'email': req.params.email}, function(err, user) {
    password = req.params.password

    if (err) {
      console.log(err);
      return next(err);
    }
    else if(password === user.password){
      console.log(user);
      res.json(user);
    }

  })
});

//Delete User by id
app.delete('/api/users/delete/:id', function(req, res, next){
  User.findByIdAndDelete({'_id': req.params.id}, function(err, user){
    if(err){
      console.log(err);
      return next(err);
    }
    else{
      console.log(user);
      res.json(user);
    }
  })
});


/***************************SECURITY QUESTION API*******************/

//Creat Security Question
app.post('/api/questions', function(req, res, next) {
  const securityQuestion = {
    questionText: req.body.text,
  };

  SecurityQuestion.create(securityQuestion, function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestion);
      res.json(securityQuestion);
    }
  });
});

//Get all Questions
app.get('/api/questions/all', function(req, res, next) {
  SecurityQuestion.find(function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(securityQuestion);
      res.json(securityQuestion);
    }
  })
});

//Delete Security Question by id
app.delete('/api/questions/delete/:id', function(req, res, next){
  SecurityQuestion.findByIdAndDelete({'_id': req.params.id}, function(err, securityQuestion){
    if(err){
      console.log(err);
      return next(err);
    }
    else{
      console.log(securityQuestion);
      res.json(securityQuestion);
    }
  })
});


/**
 * Creates an express server and listens on port 3000
 */
http.createServer(app).listen(serverPort, function() {
  console.log(`Application started and listing on port: ${serverPort}`);
});
