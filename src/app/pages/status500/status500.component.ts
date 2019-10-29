/*
=====================================
  ; Title: status500.component.spec.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: status500.component.spec.ts this component will handle all the status 500
======================================
*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status500',
  template: `
  <div fxLayout="column">
    <mat-card fx-Flex style="margin-top: 10%; width: 50%; margin-left: 25%;" class="mat-elevation-z8">
      <mat-card-title style="text-align: center; font-size: 48px" class="mat-headline">500 - Internal Server Error</mat-card-title>
        <br><br>
        <mat-card-actions>
          <button fxFlex mat-raised-button color="primary" [routerLink]="['/']">Return to Homepage</button>
        </mat-card-actions>
    </mat-card>
  </div>
`,
styles: []
})
export class Status500Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
