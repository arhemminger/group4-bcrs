/*
=====================================
  ; Title: users.component.spec.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: users.component.spec.ts this component will display all users to admin
======================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private cookieService: CookieService, private http: HttpClient, private router:Router,
    private fb: FormBuilder, private location: Location) {

      this.http.get('/api/users/all').subscribe(res => {
        if (res) {
          return this.users = res;
        } else {
          return this.errorMessage = "OH NO, I couldn't find any users!!!";
        }

      })

    }

  ngOnInit() {
  }

}
