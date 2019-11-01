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
  questionText: {type: String},
  answerText: {type: String}
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
  dateCreated: {type: Date, default: new Date()},
  dateModified: {type: Date}

});

module.exports = mongoose.model('User', userSchema);

/*
Use for add record in SoapUI

{
  "userName": "wthomason" ,
  "password": "Redblue123",
  "firstName": "William",
  "lastName": "Thomason",
  "phone": "5159758349",
  "address": "3811 SE 5th Des Moines IA 50315",
  "email": "williamthomason92@yahoo.com",
  "role": "",
  "selectedSecurityQuestions": "",
  "dateCreated": "",
  "dateModified": ""
}

*/
