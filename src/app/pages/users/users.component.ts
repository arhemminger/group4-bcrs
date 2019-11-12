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
import {UserEditComponent} from '../../shared/user-edit/user-edit.component';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  deletedUser: any;
  users: any;
  errorMessage: string;
  show: boolean = true;

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


  deleteUserConfirmation(typeEdit, obj, i){

    console.log(typeEdit);
    obj.action = typeEdit;
    obj.index = i

    const dialogRef = this.dialog.open(UserDeleteConfirmationDialogComponent,{
      disableClose: true,
      width:'500px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result=>{
      //console.log('dialog is closed');
      //console.log(result.event);
      console.log(result.data.index);
      if(result.event === 'Delete'){
        this.deleteUser(result.data);
        this.users.splice(result.data.index, 1);
      }
    });

  }

  deleteUser(data){

    this.http.delete('/api/users/delete/' + data._id).subscribe(res => {
      if (res) {

        return this.deletedUser = res;
      } else {
        return this.errorMessage = "OH NO, I couldn't find any users to delete!!!";
      }

    })

  }


  editUserConfirmation(typeEdit, obj, i){

    console.log(typeEdit);
    obj.action = typeEdit;
    obj.index = i

    const dialogRef = this.dialog.open(UserEditComponent,{
      disableClose: true,
      width:'500px',
      data: obj

    });


    dialogRef.afterClosed().subscribe(result=>{
      //console.log('dialog is closed');
      //console.log(result.event);
      //console.log(result.data.index);
      if(result.event === 'Update'){
        this.updateUser(result.data);

      }if(result.event === 'Cancel'){

        //Do something
        this.http.get('/api/users/all').subscribe(res => {
          if (res) {
            return this.users = res;
          } else {
            return this.errorMessage = "OH NO, I couldn't find any users!!!";
          }

        })

      }

    });

  }

  updateUser(data){
    //console.log(data);

    this.http.put('/api/users/update/'+ data._id,{

        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        role: data.role

    }).subscribe(res=>{
      console.log(res)
    })

  }



}
