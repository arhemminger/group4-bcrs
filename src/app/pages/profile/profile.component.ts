/*
=====================================
  ; Title: profile.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: profile.component.ts this page will display the users "profile" with an
  ; edit button that will call a modal window that contains a form to update the users information.
======================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  id: any;
  errorMessage: string;

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit() {
    this.id = '5dc7360b052aec4b34372ab9';  //used for testing
    //this.id = this.cookieService.get('userId');
    console.log(this.id);
    this.http.get('/api/users/' + this.id).subscribe(res => {
      if (res) {
        return this.user = res;
      } else {
        console.log('Error no user found with id: ' + this.id);
        return this.errorMessage = "No user found";
      }
    })
  }

}
