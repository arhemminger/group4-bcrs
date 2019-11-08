/*
=====================================
  ; Title: role-management.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: November 5 2019
  ; Description: Component to handle role management.
======================================
*/
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { RoleEditDialogComponent } from './role-edit-dialog.component';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styles: [`
    table {
      width: 100%;
    }
    .input-container > * {
      width: 100%;
    }
  `]
})
export class RoleManagementComponent implements OnInit {
  role = new FormControl('', [Validators.required]);
  form: FormGroup;
  displayedColumns: string[] = ['ID', 'Role', 'Actions'];
  dataSource : any;

  constructor(private http: HttpClient, private fb: FormBuilder,public dialog: MatDialog) {
    this.http.get('/api/roles/all').subscribe(res => {
      if (res){
        console.log(res);
        this.dataSource=res;
      } else {
        console.log("Error: Could not find Roles");
      }
    }), err => {
      console.log(err);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      newRole: [null, Validators.compose([Validators.required])]
    });
  }

  // Function to return all roles to load the table.
  getTableData(){
    this.http.get('/api/roles/all').subscribe(res => {
      if (res){
        console.log(res);
        this.dataSource=res;
      } else {
        console.log("Error: Could not find Roles");
      }
    }), err => {
      console.log(err);
    }
  }

  // Function to edit role record in table
  editTable(typeEdit, obj){
    console.log(typeEdit);
    obj.action = typeEdit;
    const dialogRef= this.dialog.open(RoleEditDialogComponent,{
      width:'40%',
      data:obj
    });
      dialogRef.afterClosed().subscribe(result=>{
      console.log('dialog is closed');
      console.log(result.event);
          if (result.event === 'Update'){
            this.updateData(result.data)
          } else if(result.event === 'Delete'){
            this.deleteData(result.data)
          } else if(result.event === 'Cancel'){
            console.log(result.event);
            this.getTableData(); //Do something
          }
      }), err => {
        console.log(err);
      }
    }

  // Function to add new role record to db
  create() {
    this.http.post('/api/create/role', {
      role: this.form.controls['newRole'].value
    }).subscribe(res => {
      this.getTableData(); //this will get all records from the database and reload the table.
      console.log("New role added to DB: " + res);
    }), err => {
      console.log("Error adding new role record: " + this.form.controls['newRole'].value);
      console.log(err);
    }
  }

  // Function to update an existing role record in table
  updateData(role_obj){
    this.http.put('/api/update/role/'+ role_obj._id,{
      role:role_obj.role
    }).subscribe(res=>{
      this.getTableData();
      console.log(res);
    }), err => {
      console.log("Error updating role record: " + role_obj._id);
      console.log(err);
    }
  }

  // Function to remove an existing question record in db
  deleteData(role_obj){
    this.http.delete('/api/delete/role/' + role_obj._id).subscribe(res=>{
      this.getTableData();
      console.log(res);
    }), err => {
      console.log("Error deleting role record: " + role_obj._id);
      console.log(err);
    }
  }
}
