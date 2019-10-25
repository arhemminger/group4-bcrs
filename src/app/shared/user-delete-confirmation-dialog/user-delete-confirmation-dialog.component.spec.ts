/*
=====================================
  ; Title: users-delete-confirmation-dialog.component.spec.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 25 2019
  ; Description: users-delete-confirmation-dialog.component.spec.ts
======================================
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteConfirmationDialogComponent } from './user-delete-confirmation-dialog.component';

describe('UserDeleteConfirmationDialogComponent', () => {
  let component: UserDeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<UserDeleteConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeleteConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
