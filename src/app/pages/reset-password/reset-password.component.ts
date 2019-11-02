/*
=====================================
  ; Title: reset-password.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: November 1 2019
  ; Description: Component to handle forgot password, step 3 reset password.
======================================
*/
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isAuthenticated: string;
  email: string;
  resetPwForm: FormGroup;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService) {
    this.isAuthenticated = this.cookieService.get('isAuthenticated');
    this.email = this.cookieService.get('verifyEmail');
   }

  ngOnInit() {
    this.resetPwForm = this.fb.group({
      password: [null, Validators.compose([
          Validators.required, 
          Validators.minLength(8)
          //Validators.pattern^((?=\S*?[A-Z])(?=\S*?[0-9]).{7,})\S$
        ])] //regEx for password requirements (min 8 char, min 1 uppercase letter, min 1 number)
    });
  }

  // function to reset users password on forgot password submission/validation
  resetPassword() {
    this.http.post('/api/users/reset-password/' + this.email, {
      password: this.resetPwForm.controls['password'].value
    }).subscribe(res => {
      //user is authenticated and allow access
      console.log('Password changed successfully');
      this.router.navigate(['']); 
    }), err => {
      console.log(err);
      this.errorMessage = 'The password you entered does not meet requirements';
    } 
  }
}
