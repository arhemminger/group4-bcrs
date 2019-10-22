import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';

import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './shared';
import { HomeComponent } from './pages/home/home.component';
import { SessionLayoutComponent } from './shared';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Status500Component } from './pages/status500/status500.component';
import { GraphComponent } from './pages/graph/graph.component';
import { UsersComponent } from './pages/users/users.component';
import { SecurityQuestionsComponent } from './pages/security-questions/security-questions.component';
import { AuthGuardComponent } from './shared/auth-guard/auth-guard.component';
import { UserEditComponent } from './shared/user-edit/user-edit.component';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { InvoiceSummaryComponent } from './shared/invoice-summary/invoice-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    HomeComponent,
    SessionLayoutComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    AboutComponent,
    ContactComponent,
    ShopComponent,
    ProfileComponent,
    Status500Component,
    GraphComponent,
    UsersComponent,
    SecurityQuestionsComponent,
    AuthGuardComponent,
    UserEditComponent,
    ForgotPasswordComponent,
    InvoiceSummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {useHash: true, enableTracing: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
