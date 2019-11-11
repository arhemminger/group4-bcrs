/*
=====================================
  ; Title: orders.js
  ; Authors: William Thomason
  ;         Griselda Balmaceda
  ;         Andrew Hemminger
  ; Date: November 6 2019
  ; Description: orders.js schema file
======================================
*/

const mongoose = require('mongoose');

let products = mongoose.Schema({
  name: {type: String},
  cost: {type: String},  //number
  id: {type: String}
});

let ordersSchema = mongoose.Schema({
  //role: String,
  //isAdmin: Boolean
  userId: {type: String},
  dateOrdered: {type: Date, default: new Date()},
  parts: {type: String},
  labor: {type: String},
  total: {type: String},   //number
  productsOrdered: [products]

});

module.exports = mongoose.model('orders', ordersSchema);
