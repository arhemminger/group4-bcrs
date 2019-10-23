/*
=====================================
  ; Title: invoice-summary.component.spec.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: invoice-summary.component.spec.ts
======================================
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSummaryComponent } from './invoice-summary.component';

describe('InvoiceSummaryComponent', () => {
  let component: InvoiceSummaryComponent;
  let fixture: ComponentFixture<InvoiceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
