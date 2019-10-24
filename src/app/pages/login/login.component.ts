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
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor() { }
  userLoginForm = new FormGroup({
    'email': new FormControl(''),
    'password':new FormControl('')
  });
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.userLoginForm.value);
  }



  ngOnInit() {

  }

}
