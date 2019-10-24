/*
=====================================
  ; Title: users.js
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: users.js schema file
======================================
*/

const mongoose = require('mongoose');

let securityQuestions = mongoose.Schema({
  questionId: {type: string},
  answerText: {type: string}
});

let userSchema = mongoose.Schema({
  userName: {type: String, required: true, unique: true, dropDups: true},
  password: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  phone: {type: String},
  address: {type: String},
  email: {type: String},
  role: {type: String, default: 'standard'},
  selectedSecurityQuestions: [securityQuestions],
  dateCreated: new date(),
  dateModified: {String}

});

module.exports = mongoose.model('User', userSchema);
