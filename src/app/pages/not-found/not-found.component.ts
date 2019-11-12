/*
=====================================
  ; Title: not-found.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: not-found.component.ts This page will handle all the 404 page not found.
======================================
*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <div class="home">
    <div fxLayout="column">
      <mat-card fx-Flex style="margin-top: 15%; width: 50%; margin-left: 25%;" class="mat-elevation-z8">
        <mat-card-title fxLayoutAlign="center">404 - Page Not Found</mat-card-title>
        <mat-card-subtitle fxLayoutAlign="center">The requested page does not exist</mat-card-subtitle>
        <mat-divider [inset]="true"></mat-divider>
          <p style="text-align: center;">Please go to the Bob's Computer Repair Shop home page by clicking the link below.</p>
        <mat-card-actions>
          <button fxFlex mat-raised-button color="primary" [routerLink]="['/']">Return to Homepage</button>
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
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
