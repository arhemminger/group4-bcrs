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
  questionText: {type: String, unique: true, dropDups: true}

});

module.exports = mongoose.model('securityQuestion', securityQuestionSchema);
