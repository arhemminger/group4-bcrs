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
import { FormGroup, FormControl, FormBuilder, Validators, Form } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedValue1 : any;
  selectedValue2 : any;
  selectedValue3 : any;
 securityAnswer1 :  String;
 securityAnswer2 :  String;
 securityAnswer3 :  String;
  securityQuestions : any;


  registeringUser: any;

  registrationForm:FormGroup;
  userName:String;
  firstName:String;
  lastName:String;
  phone:String;
  address:String;
  email:String;
  userSelectedSecurityQuestion:any = [];
  password:String;


  constructor(private http:HttpClient, private cookieService: CookieService, private fb: FormBuilder) {
    this.http.get('/api/questions/all').subscribe(res => {
      if (res){
        //console.log(res);
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

    this.registrationForm = this.fb.group({
      userName: new FormControl(),
      password:  new FormControl(),
      firstName:  new FormControl(),
      lastName:  new FormControl(),
      phone:  new FormControl(),
      address:  new FormControl(),
      email:  new FormControl(),
      securityAnswer1 :  new FormControl(),
      securityAnswer2 :  new FormControl(),
      securityAnswer3 :  new FormControl()

    });

}
onSubmit() {


  this.userSelectedSecurityQuestion=[
    {selectedQuestion: this.selectedValue1,
     selectedAnswer: this.registrationForm.value.securityAnswer1},
     {selectedQuestion:this.selectedValue2,
      selectedAnswer:this.registrationForm.value.securityAnswer2},
      {selectedQuestion:this.selectedValue3,
        selectedAnswer:this.registrationForm.value.securityAnswer3},
    ]

    /**
     * The values returned by the form include the security question answers.
     *
     * We need to save all the values into an array and omit the three security question answers.
     *
     *
     * then we need to add the above userSelectedSecurityQuestion array to the registeringUser array as a nested array
     *
     * Then we need to take the registeringUser array and insert it into the database.
     *
     */
    //this.registeringUser['userName'] = this.registrationForm.value['userName'];
    //this.registeringUser = this.registrationForm.value.firstName;
    //this.registeringUser = this.registrationForm.value.lastName;
    //this.registeringUser = this.registrationForm.value.phone;
    //this.registeringUser = this.registrationForm.value.address;
    //this.registeringUser = this.registrationForm.value.email;
    //this.registeringUser = this.registrationForm.value.password;
    //this.registeringUser['selectedSecurityQuestions'] = this.userSelectedSecurityQuestion;


   this.registrationForm['selectedSecurityQuestions'] = this.userSelectedSecurityQuestion;

  console.log("registrationForm");
  console.log(this.registrationForm);

  //const userLogin=registrationForm.value;
  console.log("registeredUser")
  console.log(this.registeringUser);

  console.log("Security questions array.......");
  console.log(this.userSelectedSecurityQuestion);


}
}
