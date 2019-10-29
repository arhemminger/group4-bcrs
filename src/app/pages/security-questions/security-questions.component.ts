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
import { MatDialog, throwMatDialogContentAlreadyAttachedError} from '@angular/material';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css']
})

export class SecurityQuestionsComponent implements OnInit {
  question = new FormControl('', [Validators.required]);
  form: FormGroup;
  displayedColumns: string[] = ['ID', 'Question', 'Actions'];
  dataSource : any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder,public dialog: MatDialog) {
   this.http.get('/api/questions/all').subscribe(res => {
    if (res){
      console.log(res);
      this.dataSource=res;
    } else {
      console.log("Error: Could not find Questions");
    }
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }

  // Function to edit question record in table
  editTable(typeEdit,obj){
    console.log(typeEdit);
    obj.action = typeEdit;
    const dialogRef= this.dialog.open(EditDialogComponent,{
      width:'40%',
      data:obj
    });
      dialogRef.afterClosed().subscribe(result=>{
      console.log('dialog is closed');
          if(result.event === 'Update'){
            this.updateData(result.data)
          }else if(result.event === 'Delete'){
            this.deleteData(result.data)
          }
    });
    }


    // Function to add new question record to db
    create() {
    this.http.post('/api/questions', {
      questionText: this.form.controls['text'].value,
    }).subscribe(res => {
      //this will pull all questions from database and reload the table.
      this.http.get('/api/questions/all').subscribe(res => {
        if (res){
          console.log(res);
          this.dataSource=res;
        } else {
          console.log("Error: Could not find Questions");
        }
        })

      //location.reload();
      console.log("New security question added to DB: " + this.question);
    }), err => {
      console.log("Error adding question record: " + this.form.controls['text'].value);
    }
  }

    // Function to update an existing question record in table
    updateData(question_obj){
    this.http.put('/api/questions/update/'+ question_obj._id,{
      questionText:question_obj.questionText
    }).subscribe(res=>{
      location.reload();
      console.log(res);
    }), err => {
      console.log("Error updating question record: " + question_obj._id);
    }
    }

    // Function to remove an existing question record in db
    deleteData(question_obj){
      this.http.delete('/api/questions/delete/' + question_obj._id).subscribe(res=>{
        location.reload();
        console.log(res);
      }), err => {
        console.log("Error deleting question record: " + question_obj._id);
      }
    }

}
