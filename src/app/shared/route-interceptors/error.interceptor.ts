/*
=====================================
  ; Title: error.interceptor.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: November 1 2019
  ; Description: interceptor to handle errors
======================================
*/
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {

      if ([404].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/page-not-found']);
        console.log('404 interceptor triggered');
      }

      if ([500].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/internal-server-error']);
        console.log('500 interceptor triggered');
      }

      if ([401].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/unauthorized']);
        console.log('401 interceptor triggered');
      }

      // else, catch the error and throw
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
