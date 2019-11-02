/*
=====================================
  ; Title: verify-security-questions.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: November 1 2019
  ; Description: Component to handle forgot password, step 2 verify security questions.
======================================
*/
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-verify-security-questions',
  templateUrl: './verify-security-questions.component.html',
  styleUrls: ['./verify-security-questions.component.css']
})
export class VerifySecurityQuestionsComponent implements OnInit {
  selectedSecurityQuestions: any;
  question1: string;
  question2: string;
  question3: string;
  email: string;
  verifyQuestionsForm: FormGroup;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService) { 
    this.email = this.cookieService.get('verifyEmail');
    console.log(this.email);

    this.http.get('/api/users/selectedSecurityQuestions/' + this.email).subscribe(res => {
      if (res) {
        this.selectedSecurityQuestions = res;
        console.log(this.selectedSecurityQuestions);
      } else {
        console.log('No questions found');
      }
    }, err => {
      console.log(err);
    }, () => {
      this.question1 = this.selectedSecurityQuestions[0].question;
      this.question2 = this.selectedSecurityQuestions[1].question;
      this.question3 = this.selectedSecurityQuestions[2].question;

      console.log(this.question1);
      console.log(this.question2);
      console.log(this.question3);
    })
  }

  ngOnInit() {
    this.verifyQuestionsForm = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });
  }

  // function to validate security question answers on submission
  verifySecurityQuestions() {
    const answerToSecurityQuestion1 = this.verifyQuestionsForm.controls['answerToSecurityQuestion1'].value;
    const answerToSecurityQuestion2 = this.verifyQuestionsForm.controls['answerToSecurityQuestion2'].value;
    const answerToSecurityQuestion3 = this.verifyQuestionsForm.controls['answerToSecurityQuestion3'].value;

    this.http.post('/api/users/verify/securityQuestions/' + this.email, {
      answerToSecurityQuestion1: answerToSecurityQuestion1,
      answerToSecurityQuestion2: answerToSecurityQuestion2,
      answerToSecurityQuestion3: answerToSecurityQuestion3
    }).subscribe(res => {
      if(res['auth']) {
        this.router.navigate(['/session/reset-password'], {skipLocationChange: true});
        this.cookieService.set('isAuthenticated', 'true');
      } else {
        console.log('Security quesiton answers failed validation');
        this.errorMessage = 'The answers you entered are invalid'; 
        this.cookieService.set('isAuthenticated', 'false');
      }
    });
  }
}
