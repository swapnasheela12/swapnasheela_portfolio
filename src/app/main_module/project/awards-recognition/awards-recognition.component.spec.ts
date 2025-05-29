import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsRecognitionComponent } from './awards-recognition.component';

describe('AwardsRecognitionComponent', () => {
  let component: AwardsRecognitionComponent;
  let fixture: ComponentFixture<AwardsRecognitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardsRecognitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
