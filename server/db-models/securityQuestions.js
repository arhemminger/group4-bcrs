/*
=====================================
  ; Title: securityQuestions.js
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: securityQuestions.js schema file
======================================
*/

const mongoose = require('mongoose');

let securityQuestionSchema = mongoose.Schema({
  questionText: String,

});

module.exports = mongoose.model('securityQuestion', securityQuestionSchema);
