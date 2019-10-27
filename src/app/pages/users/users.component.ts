/*
=====================================
  ; Title: users.component.spec.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: users.component.spec.ts this component will display all users to admin
======================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { MatDialog, throwMatDialogContentAlreadyAttachedError} from '@angular/material';
import {UserDeleteConfirmationDialogComponent} from '../../shared/user-delete-confirmation-dialog/user-delete-confirmation-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  deletedUser: any;
  users: any;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private cookieService: CookieService, private http: HttpClient, private router:Router,
    private fb: FormBuilder, private location: Location, public dialog: MatDialog) {

      this.http.get('/api/users/all').subscribe(res => {
        if (res) {
          return this.users = res;
        } else {
          return this.errorMessage = "OH NO, I couldn't find any users!!!";
        }

      })

    }

  ngOnInit() {
  }

  deleteUserConfirmation(typeEdit, obj){

    console.log(typeEdit);
    obj.action = typeEdit;

    const dialogRef = this.dialog.open(UserDeleteConfirmationDialogComponent,{
      width:'250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log('dialog is closed')
      console.log(result.event)
      if(result.event === 'Delete'){
        this.deleteUser(result.data)
      }
    });

  }

  deleteUser(data){

    this.http.delete('/api/users/delete/' + data._id).subscribe(res => {
      if (res) {
        delete this.deletedUser;
        return this.deletedUser = res;
      } else {
        return this.errorMessage = "OH NO, I couldn't find any users to delete!!!";
      }

    })

  }


}
