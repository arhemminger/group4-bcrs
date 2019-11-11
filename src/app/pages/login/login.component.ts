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
import { FormGroup, FormControl, Validators, EmailValidator, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

form: FormGroup;
//email:FormControl;
//password:FormControl;
errorMessage: string;

  constructor(private http:HttpClient,private router:Router,private cookieService:CookieService, private fb: FormBuilder) { }

  /*
  ngOnInit() {
    this.email= new FormControl('',Validators.required)
    this.password = new FormControl('',Validators.required)
    this.loginForm = new FormGroup({
    email:this.email,
    password:this.password
    });
  }

  onSubmit(loginForm:FormGroup) {
    //console.log(loginForm)
    const userLogin=loginForm.value;
    //console.log(userLogin)
    this.http.post('/api/users/login', {
      email: userLogin['email'],
      password: userLogin['password']

    }).subscribe(
      res =>{
        this.cookieService.set('userId', res['_id'], 1);
        this.cookieService.set('isAuthenticated', 'true', 1);
        this.cookieService.set('email', res['email'], 1);
        this.router.navigate(['my-profile']);
        //console.log('RES is bellow!!!!!')
        console.log(res);
      },
      err => {
        console.log("POST login failed see error: ", err);
      },
      () => {
        console.log("The POST login works, You are now logged in.");
      });
  }
*/

ngOnInit() {
  this.form = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required])] // , Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/) //regEx for password requirements (min 8 char, min 1 uppercase letter, min 1 number)
  })
}

signIn() {
  const email = this.form.controls['email'].value;
  const password = this.form.controls['password'].value;

  this.http.post('/api/users/login', {
    email: email,
    password: password
  }).subscribe(res => {
    if (res['auth']) {
      //user is authenticated
      this.cookieService.set('userId', res['_id'], 1);
      this.cookieService.set('isAuthenticated', 'true', 1);
      this.cookieService.set('email', res['email'], 1);
      this.router.navigate(['my-profile']);
      console.log(res);
    } else {
      //user is not authenticated
      this.errorMessage = res['text'];
    }
  })
}

}
