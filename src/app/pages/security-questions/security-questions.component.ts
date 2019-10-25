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
import {FormControl, Validators} from '@angular/forms';

export interface PeriodicElement {
  ID: string;
  Question: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ID: '1', Question: 'What is your favorite animal?'},
  {ID: '2', Question: 'What street did you grow up on?'},
  {ID: '3', Question: 'What is the name of your childhood best friend?'},
  {ID: '4', Question: 'What is your favorite place to visit?'}
];

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css']
})
export class SecurityQuestionsComponent implements OnInit {
  question = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.question.hasError('required') ? 'You must enter a value' :
            '';
  }

  displayedColumns: string[] = ['ID', 'Question', 'Actions'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
