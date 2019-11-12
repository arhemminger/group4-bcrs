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
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  // Function to logout the user. Remove isAuthenticated cookie
  logout () {
    this.cookieService.delete('isAuthenticated'); //created at login
    this.cookieService.delete('userId'); //created at login
    this.cookieService.delete('email'); //login used to verify role
    this.cookieService.delete('verifyEmail');  //used in forgot password
    //this.cookieService.deleteAll();  //delete all cookies
    location.reload();
    console.log("User logged out.");
  }
}
