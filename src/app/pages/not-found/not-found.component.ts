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
  <div fxLayout="column">
    <mat-card fx-Flex style="margin-top: 10%; width: 50%; margin-left: 25%;" class="mat-elevation-z8">
      <mat-card-title style="text-align: center; font-size: 48px" class="mat-headline">404 - Page Not Found</mat-card-title>
        <br><br>
        <mat-card-actions>
          <button fxFlex mat-raised-button color="primary" [routerLink]="['/']">Return to Homepage</button>
        </mat-card-actions>
    </mat-card>
  </div>
  `,
  styles: []
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
