/*
=====================================
  ; Title: user-edit.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: user-edit.component.ts
======================================
*/

import { Component, OnInit, Inject } from '@angular/core';
import {UsersComponent} from '../../pages/users/users.component'
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  edit:any;

  constructor(public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.edit = data;
    console.log(this.edit);

     }


     updateUser(){
      this.dialogRef.close({event:this.edit.action, data:this.edit})
    }

     closeDialog(){
      this.dialogRef.close()
    }

  ngOnInit() {
  }

}
