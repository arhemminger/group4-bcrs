/*
=====================================
  ; Title: app.routing.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: app.routing.ts
======================================
*/

import {Routes} from '@angular/router';
import {BaseLayoutComponent, SessionLayoutComponent} from './shared';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import { SecurityQuestionsComponent } from './pages/security-questions/security-questions.component';
import { UserEditComponent } from './shared/user-edit/user-edit.component';
import { Status500Component } from './pages/status500/status500.component';
import { AuthGuard } from './shared/guard/authGuard';
import { ProfileComponent } from './pages/profile/profile.component';
import { GraphComponent } from './pages/graph/graph.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ShopComponent } from './pages/shop/shop.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
        //canActivate: [AuthGuard]
      },
      {
        path: 'admin/user-edit',
        component: UserEditComponent
        //canActivate: [AuthGuard]   <-how to route for admin only?
      },
      {
        path: 'admin/security-questions',
        component: SecurityQuestionsComponent
        //canActivate: [AuthGuard]   <-how to route for admin only?
      },
      {
        path: 'admin/sales-chart',
        component: GraphComponent
        //canActivate: [AuthGuard]   <-how to route for admin only?
      },
      {
        path: 'my-profile',
        component: ProfileComponent
        //canActivate: [AuthGuard]
      },
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'contact-us',
        component: ContactComponent
      },
      {
        path: 'about-us',
        component: AboutComponent
      },
    ]
  },
  {
    path: 'Internal-Server-Error',
    component: Status500Component
  },
  {
    path: 'session',
    component: SessionLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '404',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
];
