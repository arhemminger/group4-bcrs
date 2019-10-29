/*
=====================================
  ; Title: edit-dialog.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: edit-dialog.component.ts
  ; This dialog is used to edit security questions.
======================================
*/

import { Component, OnInit,Inject } from '@angular/core';
import {SecurityQuestionsComponent} from '../security-questions/security-questions.component'
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
edit:any;
  constructor(public dialogRef: MatDialogRef<SecurityQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.edit = data;
    console.log(this.edit)
     }
doEdit(){
  this.dialogRef.close({event:this.edit.action, data:this.edit})
}
closeDialog(){
  this.edit.action = "Cancel";
  this.dialogRef.close({event:this.edit.action})
}
  ngOnInit() {
  }

}
