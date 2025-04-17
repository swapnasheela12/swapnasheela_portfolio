/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InfographicD3Component } from './infographic-d3.component';

describe('InfographicD3Component', () => {
  let component: InfographicD3Component;
  let fixture: ComponentFixture<InfographicD3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfographicD3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfographicD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
