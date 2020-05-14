import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QfFormArrayComponent } from './qf-form-array.component';

describe('QfFormArrayComponent', () => {
  let component: QfFormArrayComponent;
  let fixture: ComponentFixture<QfFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QfFormArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QfFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
