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
//Routes
import { AppRoutes } from './app.routing';

//Components
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
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { CookieService } from 'ngx-cookie-service';
import { UserDeleteConfirmationDialogComponent } from './shared/user-delete-confirmation-dialog/user-delete-confirmation-dialog.component';
import { EditDialogComponent } from './pages/edit-dialog/edit-dialog.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { VerifySecurityQuestionsComponent } from './pages/verify-security-questions/verify-security-questions.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SummaryDialogComponent } from './pages/summary-dialog/summary-dialog.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { RoleEditDialogComponent } from './pages/role-management/role-edit-dialog.component';
import { UserEditComponent } from './shared/user-edit/user-edit.component';
import { InvoiceSummaryComponent } from './shared/invoice-summary/invoice-summary.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import {ChartModule} from 'primeng/chart';

//Guards
import { AuthGuard } from './shared/guard/authGuard';

//Interceptors
import { ErrorInterceptor } from './shared/route-interceptors/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, matMenuAnimations } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';



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
    UserEditComponent,
    InvoiceSummaryComponent,
    NavigationComponent,
    UserDeleteConfirmationDialogComponent,
    EditDialogComponent,
    UnauthorizedComponent,
    VerifyEmailComponent,
    VerifySecurityQuestionsComponent,
    ResetPasswordComponent,
    SummaryDialogComponent,
    RoleManagementComponent,
    RoleEditDialogComponent,
    ForgotPasswordComponent
  ],
  exports:[
    ReactiveFormsModule,
    EditDialogComponent,
    RoleEditDialogComponent,
    UserDeleteConfirmationDialogComponent,
    UserEditComponent,

  ],
  entryComponents:[EditDialogComponent, UserDeleteConfirmationDialogComponent, UserEditComponent, SummaryDialogComponent, RoleEditDialogComponent],
    imports: [
    BrowserModule,
    ChartModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    MatSidenavModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes, {useHash: true, enableTracing: false}),
    MatTableModule,
    MatSelectModule,
    MessagesModule,
    MessageModule
  ],
  providers: [
    CookieService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
