import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPasswordResetComponent } from './request-password-reset.component';

describe('RequestPasswordResetComponent', () => {
  let component: RequestPasswordResetComponent;
  let fixture: ComponentFixture<RequestPasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPasswordResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
