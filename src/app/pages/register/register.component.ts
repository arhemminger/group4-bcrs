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


  constructor(private http:HttpClient, private cookieService: CookieService, private fb: FormBuilder, private router:Router) {
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
      userName: new FormControl(null, Validators.required),
      password:  new FormControl(null, Validators.required),
      firstName:  new FormControl(null, Validators.required),
      lastName:  new FormControl(null, Validators.required),
      phone:  new FormControl(null, Validators.required),
      address:  new FormControl(null, Validators.required),
      email:  new FormControl(null, Validators.required),
      securityAnswer1 :  new FormControl(null, Validators.required),
      securityAnswer2 :  new FormControl(null, Validators.required),
      securityAnswer3 :  new FormControl(null, Validators.required)

    });

}
onSubmit() {


  this.userSelectedSecurityQuestion=[
    {question: this.selectedValue1,
      answerText: this.registrationForm.value.securityAnswer1},
     {question:this.selectedValue2,
      answerText:this.registrationForm.value.securityAnswer2},
      {question:this.selectedValue3,
        answerText:this.registrationForm.value.securityAnswer3},
    ]

    /**
     *
     * Then we need to take the registeringUser array and insert it into the database.
     *
     */

    //creates desired object to be sent to DB
    this.registeringUser = [{
      'userName' : this.registrationForm.value.userName,
      'firstName': this.registrationForm.value.firstName,
      'lastName': this.registrationForm.value.lastName,
      'phone': this.registrationForm.value.phone,
      'address': this.registrationForm.value.address,
      'email': this.registrationForm.value.email,
      'password': this.registrationForm.value.password,
      'selectedSecurityQuestions': this.userSelectedSecurityQuestion
    }];

    this.http.post('/api/users/register', {

      userName : this.registrationForm.value.userName,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      phone: this.registrationForm.value.phone,
      address: this.registrationForm.value.address,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      questions: this.userSelectedSecurityQuestion

    }).subscribe(
      res =>{

        this.cookieService.set('isAuthenticated','true',1);
        this.router.navigate(['my-profile']);
        console.log(res);

      },
      err => {

        console.log("POST Registration failed see error: ", err);

      },
      () => {

        console.log("The POST Registration works, You are now Registered and logged in.");
      });



  console.log("registrationForm");
  console.log(this.registrationForm);

  //const userLogin=registrationForm.value;
  console.log("registeredUser")
  console.log(this.registeringUser);

  console.log("Security questions array.......");
  console.log(this.userSelectedSecurityQuestion);


}
}
