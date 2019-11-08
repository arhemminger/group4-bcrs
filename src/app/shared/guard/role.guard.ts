/*
=====================================
  ; Title: role.guard.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: role.guard.ts
======================================
*/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private HttpClient, private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.getRole().pipe(map(res=> {
      console.log(res);
      if (res === 'admin') {
        return true;
      } else {
        this.router.navigate(['/']); //session/unauthorized
        return false;
      }
    }));
  }

    getRole() {
      return this.HttpClient.get('api/user/' + this.cookieService.get('userId')); //returns user role
    }
  }
