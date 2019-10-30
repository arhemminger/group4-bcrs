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
  <div class="home">
    <div fxLayout="column">
      <mat-card fx-Flex style="margin-top: 15%; width: 50%; margin-left: 25%;" class="mat-elevation-z8">
        <mat-card-title style="text-align: center; font-size: 48px" class="mat-headline">401 - Unauthorized</mat-card-title>
        <mat-divider style="margin-top: 3%;" [inset]="true"></mat-divider>
          <p style="text-align: center;">You are not authorized to access this page.</p>
          <p style="text-align: center;">Please login, return to the home page or contact the administrator for further assistance.</p>
        <mat-card-actions>
          <button fxFlex mat-raised-button color="primary" [routerLink]="['/']">Return to Homepage</button>
          <button fxFlex mat-raised-button color="primary" [routerLink]="['/session/login']">Login</button>
        </mat-card-actions>
      </mat-card>
    </div>
  </div>
  `,
  styles: [`
    .home{
      background-size: cover;
      height:100vh;
      background-image: url('../../../assets/images/bobs-home.jpg');
  }`]
})
export class UnauthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
