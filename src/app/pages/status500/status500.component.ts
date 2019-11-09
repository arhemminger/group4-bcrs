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
  <div class="home">
    <div fxLayout="column">
      <mat-card fx-Flex style="margin-top: 15%; width: 50%; margin-left: 25%;" class="mat-elevation-z8">
        <mat-card-title fxLayoutAlign="center">500 - Internal Server Error</mat-card-title>
        <mat-card-subtitle fxLayoutAlign="center">The requested page cannot be displayed due to an internal server error</mat-card-subtitle>
        <mat-divider [inset]="true"></mat-divider>
          <p style="text-align: center;">If the error persists please <span><a routerLink="/contact-us" routerLinkActive="active">contact us</a></span>.</p>
          <p style="text-align: center;">Return to the Bob's Computer Repair Shop home page by clicking the link below.</p>
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
export class Status500Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
