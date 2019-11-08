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
import { Routes } from '@angular/router';
import { BaseLayoutComponent, SessionLayoutComponent } from './shared';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SecurityQuestionsComponent } from './pages/security-questions/security-questions.component';
import { UsersComponent } from './pages/users/users.component';
import { UserEditComponent } from './shared/user-edit/user-edit.component';
import { Status500Component } from './pages/status500/status500.component';
import { AuthGuard } from './shared/guard/authGuard';
import { ProfileComponent } from './pages/profile/profile.component';
import { GraphComponent } from './pages/graph/graph.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ShopComponent } from './pages/shop/shop.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { VerifySecurityQuestionsComponent } from './pages/verify-security-questions/verify-security-questions.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { RoleGuard } from './shared/guard/role.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'admin/user-edit',
        component: UserEditComponent,
        canActivate: [AuthGuard] //, RoleGuard
      },
      {
        path: 'admin/security-questions',
        component: SecurityQuestionsComponent,
        canActivate: [AuthGuard] //, RoleGuard
      },
      {
        path: 'admin/sales-chart',
        component: GraphComponent,
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        path: 'admin/users',
        component: UsersComponent,
        canActivate: [AuthGuard] //, RoleGuard
      },
      {
        path: 'admin/role-management',
        component: RoleManagementComponent,
        canActivate: [AuthGuard] //, RoleGuard
      },
      {
        path: 'my-profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'shop',
        component: ShopComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contact-us',
        component: ContactComponent
      },
      {
        path: 'about-us',
        component: AboutComponent
      }
    ]
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
        path: 'register',
        component : RegisterComponent,
      },
      {
        path: 'forgot-password',
        component : VerifyEmailComponent,
      },
      {
        path: 'verify-security-questions',
        component : VerifySecurityQuestionsComponent,
      },
      {
        path: 'reset-password',
        component : ResetPasswordComponent,
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      },
      {
        path: 'page-not-found',
        component: NotFoundComponent
      },
      {
        path: 'internal-server-error',
        component: Status500Component
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/session/page-not-found'
  }
];
