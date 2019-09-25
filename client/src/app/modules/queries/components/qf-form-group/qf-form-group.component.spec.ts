import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QfFormGroupComponent } from './qf-form-group.component';

describe('QfFormGroupComponent', () => {
  let component: QfFormGroupComponent;
  let fixture: ComponentFixture<QfFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QfFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QfFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
