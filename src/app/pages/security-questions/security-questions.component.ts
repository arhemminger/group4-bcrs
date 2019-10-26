/*
=====================================
  ; Title: security-question.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: security-question.component.ts
======================================
*/
import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  questions: any;
}

const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css']
})
export class SecurityQuestionsComponent implements OnInit {
  question = new FormControl('', [Validators.required]);
  form: FormGroup;

  getErrorMessage() {
    return this.question.hasError('required') ? 'You must enter a value' :
            '';
  }

  displayedColumns: string[] = ['ID', 'Question', 'Actions'];
  dataSource = ELEMENT_DATA;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder) {
  }
 /*
 this.http.get('/api/questions/' + this.quizId).subscribe(res => {
    if (res){
      console.log(res);
      return this.questions = res;
    } else {
      console.log("Error: Could not find quiz");
    }
    })
}
*/

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }

  create() {
    this.http.post('/api/questions', {
      questionText: this.form.controls['text'].value,
    }).subscribe(res => {
      this.router.navigate(['/admin/security-questions'])
    })
  }

}
