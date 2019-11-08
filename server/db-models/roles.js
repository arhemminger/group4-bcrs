/*
=====================================
  ; Title: roles.js
  ; Authors: William Thomason
  ;         Griselda Balmaceda
  ;         Andrew Hemminger
  ; Date: November 5 2019
  ; Description: roles.js schema file
======================================
*/

const mongoose = require('mongoose');

let rolesSchema = mongoose.Schema({
  role: {type: String, unique: true, dropDups: true}
});

module.exports = mongoose.model('roles', rolesSchema);
