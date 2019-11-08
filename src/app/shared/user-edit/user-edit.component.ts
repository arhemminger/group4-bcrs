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
import { HttpClient } from '@angular/common/http';
import {UsersComponent} from '../../pages/users/users.component';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  roles: any;
  edit: any;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.edit = data;
      console.log(this.edit);

      this.http.get('/api/roles/all').subscribe(res => {
        if (res){
          console.log(res);
          this.roles=res;
        } else {
          console.log("Error: Could not find Roles");
        }
      }), err => {
        console.log(err);
      }
    }

     updateUser(){
      this.dialogRef.close({event:this.edit.action, data:this.edit})
    }

     closeDialog(): void{
      this.edit.action = "Cancel";
      this.dialogRef.close({event:this.edit.action})
    }

  ngOnInit() {
  }

}
