import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.css']
})
export class SummaryDialogComponent implements OnInit {
services:any
dataConfirmed:any
total:any
emptyServices=[]
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef: MatDialogRef<SummaryDialogComponent>,private http: HttpClient) {
    dialogRef.disableClose = true;
    this.total=data.totalCost
    this.dataConfirmed=data
    this.services=data.lineItem

   }

  ngOnInit() {
  }
  closeDialog(userChoice){
    if(userChoice==='submit'){
    this.dialogRef.close(this.dataConfirmed)
    }else{
      this.dialogRef.close()
      console.log('the user canceled')
    }
   }
  cancelForm(){

  }
}
