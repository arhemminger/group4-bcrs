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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm:FormGroup;
userEmail:FormControl;
userPassword:FormControl;
  constructor() { }
    ngOnInit() {
      this.userEmail= new FormControl('',Validators.required)
      this.userPassword = new FormControl('',Validators.required)
      this.loginForm = new FormGroup({
     email:this.userEmail,
     password:this.userPassword
      });

  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
  }





}
