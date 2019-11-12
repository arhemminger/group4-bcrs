/*
=====================================
  ; Title: role-edit-dialog.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: November 5 2019
  ; Description: role-edit-dialog.component.ts
  ; This dialog is used to edit roles.
======================================
*/
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { RoleManagementComponent } from './role-management.component';

@Component({
  selector: 'app-role-edit-dialog',
  template: `
    <h1 mat-dialog-title>{{edit.action}}</h1>
    <div mat-dialog-actions fxLayoutAlign="end" class="input-container">
      <input style="width: 100%;" placeholder="{{edit.role}}" [(ngModel)]="edit.role"/>
      <br>
      <button mat-button="warn" (click)="closeDialog()">Cancel</button>
      <button mat-button color="accent" (click)="doEdit()">{{edit.action}}</button>
    </div>
  `,
  styles: [`
    .input-container > * {
      height: auto;
    }
  `]
})
export class RoleEditDialogComponent implements OnInit {
  edit: any;

  constructor(public dialogRef: MatDialogRef<RoleManagementComponent>,
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
