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
  this.dialogRef.close()
}
  ngOnInit() {
  }

}
