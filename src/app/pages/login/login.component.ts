/*
=====================================
  ; Title: login.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: login.component.ts This will handle the login screen.
======================================
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm:FormGroup;
userEmail:FormControl;
userPassword:FormControl;
  constructor(private http:HttpClient,private router:Router,private cookieService:CookieService) { }
      ngOnInit() {
           this.userEmail= new FormControl('',Validators.required)
           this.userPassword = new FormControl('',Validators.required)
           this.loginForm = new FormGroup({
           email:this.userEmail,
           password:this.userPassword
      });

  }
  onSubmit(loginForm:FormGroup) {
    console.log(loginForm)
    const loginEmail=loginForm.value;
    console.log(loginEmail)
    this.http.post('/api/users/login', {
      result: JSON.stringify(loginEmail.value)

    }).subscribe(
      res =>{

      },
      err => {
        console.log("POST login failed see error: ", err);
      },
      () => {
        console.log("The POST login works, You are now logged in.");
      });
  }





}
