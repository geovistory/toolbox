import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFeedbackComponent } from './upload-feedback.component';

describe('UploadFeedbackComponent', () => {
  let component: UploadFeedbackComponent;
  let fixture: ComponentFixture<UploadFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
