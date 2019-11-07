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
  productName: {type: String},
  productPrice: {type: String},
  productQuantity: {type: Number}
});

let ordersSchema = mongoose.Schema({
  //role: String,
  //isAdmin: Boolean
  userId: {type: String},
  dateOrdered: {type: Date, default: new Date()},
  total: {type: String},
  productRepairTime: {type: Number},
  productsOrdered: [products]

});

module.exports = mongoose.model('orders', ordersSchema);
