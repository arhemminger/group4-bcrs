/*
=====================================
  ; Title: users-delete-confirmation-dialog.component.spec.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 25 2019
  ; Description: users-delete-confirmation-dialog.component.spec.ts
======================================
*/


import { Component, OnInit, Inject } from '@angular/core';
import {UsersComponent} from '../../pages/users/users.component'
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-user-delete-confirmation-dialog',
  templateUrl: './user-delete-confirmation-dialog.component.html',
  styleUrls: ['./user-delete-confirmation-dialog.component.css']
})
export class UserDeleteConfirmationDialogComponent implements OnInit {

  delete:any;

  constructor(public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.delete = data;
    console.log(this.delete);

     }


     deleteUser(){
      this.dialogRef.close({event:this.delete.action, data:this.delete})
    }

    closeDialog(){
      this.dialogRef.close()
    }

  ngOnInit() {
  }

}
