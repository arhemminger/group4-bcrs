/*
=====================================
  ; Title: group4-bcrs
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 27 2019
  ; Description: Web-450 Group 4 Bob's Computer Repair Shop application.
======================================
*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
  <div fxLayout="column">
    <mat-card fx-Flex style="margin-top: 10%; width: 50%; margin-left: 25%;" class="mat-elevation-z8">
      <mat-card-title style="text-align: center; font-size: 48px" class="mat-headline">401 - Unauthorized</mat-card-title>
      <mat-card-subtitle style="text-align: center">Please login or return to the Homepage.</mat-card-subtitle>
      <br>
      <mat-card-actions>
        <button fxFlex mat-raised-button color="primary" [routerLink]="['/']">Return to Homepage</button>
        <button fxFlex mat-raised-button color="primary" [routerLink]="['/session/login']">Login</button>
      </mat-card-actions>
    </mat-card>
  </div>
  `,
  styles: []
})
export class UnauthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
