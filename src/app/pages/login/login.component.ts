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
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
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
email:FormControl;
password:FormControl;

  constructor(private http:HttpClient,private router:Router,private cookieService:CookieService) {
  }

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
        console.log('RES is bellow!!!!!')
        console.log(res);
      },
      err => {
        console.log("POST login failed see error: ", err);
        this.router.navigate(['/']);
      },
      () => {
        console.log("The POST login works, You are now logged in.");
      });
  }

}
