/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Work_experinceComponent } from './work_experince.component';

describe('Work_experinceComponent', () => {
  let component: Work_experinceComponent;
  let fixture: ComponentFixture<Work_experinceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Work_experinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Work_experinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
