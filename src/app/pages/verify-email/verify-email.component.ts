/*
=====================================
  ; Title: verify-email.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: November 1 2019
  ; Description: Component to handle forgot password, step 1 verify email.
======================================
*/
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  verifyEmailForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  errorMessage: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.verifyEmailForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  // function that validates user email for forgot password functionality
  validateEmail() {
    const email = this.verifyEmailForm.controls['email'].value;

    this.http.get('api/verify/email/' + email).subscribe(res => {
      if(res) {
        this.router.navigate(['/session/verify-security-questions'], {queryParams: {email: email}, skipLocationChange: true});
        this.cookieService.set('verifyEmail', email); //set verifyEmail in cookies
      } else {
        this.cookieService.delete('verifyEmail'); //remove verifyEmail in cookies
        this.errorMessage = 'The email you entered is invalid: "' + email + '"';
        console.log(this.errorMessage);
      }
    }, err => {
      console.log(err);
    });
  }
}
