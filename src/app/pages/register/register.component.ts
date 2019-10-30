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
import {HttpClient} from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedValue1 : any
  selectedValue2 : any
  selectedValue3 : any
  securityAnswer1 :  string = ''
  securityAnswer2 :  string = ''
  securityAnswer3 :  string = ''
  securityQuestions : any;
  registrationForm:FormGroup;
  userName:FormControl;
  userFirstName:FormControl;
  userLastName:FormControl;
  userPhone:FormControl;
  userAddress:FormControl;
  userEmail:FormControl;
  userRole:FormControl;
  userSelectedSecurityQuestion:any;
  userCreated:FormControl;
  userModified:FormControl;
  userPassword:FormControl;

  constructor(private http:HttpClient) {
    this.http.get('/api/questions/all').subscribe(res => {
      if (res){
        console.log(res);
        this.securityQuestions=res;
      } else {
        console.log("Error: Could not find Questions");
      }
      });
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
  this.userName = new FormControl('');
  this.userPassword = new FormControl('');
  this.userFirstName = new FormControl('');
  this.userLastName = new FormControl('');
  this.userPhone = new FormControl('');
  this.userAddress = new FormControl('');
  this.userEmail = new FormControl('');
  this.userRole = new FormControl('');
    this.registrationForm = new FormGroup({
    userName:this.userName,
    password:this.userPassword,
    firstName:this.userFirstName,
    lastName:this.userLastName,
    phone:this.userPhone,
    address:this.userAddress,
    email:this.userEmail,
    role:this.userRole,
  })
}
onSubmit(registrationForm:FormGroup) {
  this.userSelectedSecurityQuestion=[
    {selectedQuestion:this.selectedValue1,
     selectedAnswer:this.securityAnswer1},
     {selectedQuestion:this.selectedValue2,
      selectedAnswer:this.securityAnswer2},
      {selectedQuestion:this.selectedValue3,
        selectedAnswer:this.securityAnswer3},
    ]
  console.log(registrationForm)
  const userLogin=registrationForm.value;
  console.log(userLogin)
  console.log(this.userSelectedSecurityQuestion)


}
}
