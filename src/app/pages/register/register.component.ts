/*
=====================================
  ; Title: register.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: register.component.ts This component will have a registration form.
======================================
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm:FormGroup;
  userName:FormControl;
  userFirstName:FormControl;
  userLastName:FormControl;
  userPhone:FormControl;
  userAddress:FormControl;
  userEmail:FormControl;
  userRole:FormControl;
  userSelectedSecurityQuestion:FormControl;
  userCreated:FormControl;
  userModified:FormControl;

  userPassword:FormControl;
  constructor() {

  }
  // userName: {type: String, required: true, unique: true, dropDups: true},
  // password: {type: String},
  // firstName: {type: String},
  // lastName: {type: String},
  // phone: {type: String},
  // address: {type: String},
  // email: {type: String},
  // role: {type: String, default: 'standard'},
  // selectedSecurityQuestions: [securityQuestions],
  // dateCreated: {type: Date, default: new Date()},
  // dateModified: {type: Date}
  ngOnInit() {
    this.registrationForm = new FormGroup({
    userName:this.userName,
    password:this.userPassword,
    firstName:this.userFirstName,
    lastName:this.userLastName,
    phone:this.userPhone,
    email:this.userEmail,
    role:this.userRole,
    selectedSecurityQuestion:this.userSelectedSecurityQuestion,
    dateCreated:this.userCreated,
    dateModified:this.userModified,
  })
}

}
