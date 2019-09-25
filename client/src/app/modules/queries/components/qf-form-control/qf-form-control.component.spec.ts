import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QfFormControlComponent } from './qf-form-control.component';

describe('QfFormControlComponent', () => {
  let component: QfFormControlComponent;
  let fixture: ComponentFixture<QfFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QfFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QfFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
