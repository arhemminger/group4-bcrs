import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.css']
})
export class SummaryDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit() {
  }

}
